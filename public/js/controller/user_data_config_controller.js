        document.addEventListener("DOMContentLoaded", () => {
            const tbody = document.getElementById("tbodyUsuario");

            // Toast config
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: toast => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });

            // Leer usuario actual
            const usuarioActualEmail = localStorage.getItem("usuarioActual");
            if (!usuarioActualEmail) {
                Swal.fire({
                    icon: "warning",
                    title: "Sesión no encontrada",
                    text: "Por favor, inicia sesión nuevamente."
                }).then(() => (window.location.href = "/index.html"));
                return;
            }

            const usuario = JSON.parse(localStorage.getItem(usuarioActualEmail));
            if (!usuario) {
                tbody.innerHTML = `<tr><td colspan="6">No se encontraron datos del usuario.</td></tr>`;
                return;
            }

            // Renderizar datos
            const mostrarDatosUsuario = () => {
                tbody.innerHTML = `
                    <tr>
                        <td>${usuario.cedula || "No registrado"}</td>
                        <td>${usuario.nombre || ""}</td>
                        <td>${usuario.email}</td>
                        <td>${usuario.celular || ""}</td>
                        <td>
                            <button class="editar">Editar</button>
                        </td>
                    </tr>
                `;
            };

            mostrarDatosUsuario();

            // Editar datos del usuario
            tbody.addEventListener("click", e => {
                console.log(e.target);
                if (e.target.classList.contains("editar")) {
                    Swal.fire({
                        title: "Editar datos del usuario",
                        html: `
                            <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${usuario.nombre || ""}">
                            <input id="swal-email" class="swal2-input" placeholder="Email" value="${usuario.email || ""}">
                            <input id="swal-celular" class="swal2-input" placeholder="Celular" value="${usuario.celular || ""}">
                        `,
                        confirmButtonText: "Guardar cambios",
                        cancelButtonText: "Cancelar",
                        showCancelButton: true,
                        focusConfirm: false,
                        preConfirm: () => {
                            const nombre = document.getElementById("swal-nombre").value.trim();
                            const email = document.getElementById("swal-email").value.trim();
                            const celular = document.getElementById("swal-celular").value.trim();

                            if (!nombre || !email || !celular) {
                                Swal.showValidationMessage("Todos los campos son obligatorios");
                                return false;
                            }

                            return { nombre, email, celular };
                        }
                    }).then(result => {
                        if (result.isConfirmed) {
                            const { nombre, email, celular } = result.value;

                            // Actualizar en localStorage
                            usuario.nombre = nombre;
                            usuario.email = email;
                            usuario.celular = celular;

                            localStorage.setItem(usuarioActualEmail, JSON.stringify(usuario));

                            Toast.fire({
                                icon: "success",
                                title: "Datos actualizados correctamente"
                            });

                            mostrarDatosUsuario();
                        }
                    });
                }
            });
        });

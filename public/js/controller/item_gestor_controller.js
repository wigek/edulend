document.addEventListener("DOMContentLoaded", () => {
    const tabla = document.querySelector("table");

    // Configuración del toast
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

    // Clave de localStorage
    const KEY = "prestamosUsuarios";

    // Obtener y guardar datos
    const obtenerPrestamos = () => JSON.parse(localStorage.getItem(KEY)) || [];
    const guardarPrestamos = data => localStorage.setItem(KEY, JSON.stringify(data));

    // Mostrar los préstamos
    const mostrarPrestamos = () => {
        const prestamos = obtenerPrestamos();
        const tbody = document.createElement("tbody");

        if (prestamos.length === 0) {
            tbody.innerHTML = `<tr><td colspan="8">No hay préstamos registrados</td></tr>`;
        } else {
            prestamos.forEach((p, index) => {
                const fila = document.createElement("tr");
                fila.innerHTML = `
                    <td>${"art_" + (index + 1)}</td>
                    <td>${p.articulo}</td>
                    <td>Buen estado</td>
                    <td>${p.cedula}</td>
                    <td>${p.nombre} ${p.apellido || ""}</td>
                    <td>${p.fechaIngreso || "Sin registrar"}</td>
                    <td>${p.fechaEntrega}</td>
                    <td>
                        <button type="button" class="notificar" data-index="${index}">Enviar notificación</button>
                        <button type="button" class="prorroga" data-index="${index}">Gestionar prórroga</button>
                    </td>
                `;
                tbody.appendChild(fila);
            });
        }

        // Reemplazamos el cuerpo de la tabla
        const oldTbody = tabla.querySelector("tbody");
        if (oldTbody) oldTbody.remove();
        tabla.appendChild(tbody);
    };

    // Función para gestionar prórroga
    const gestionarProrroga = (index) => {
        const prestamos = obtenerPrestamos();
        const prestamo = prestamos[index];

        Swal.fire({
            title: "Gestionar prórroga",
            html: `
                <p>Selecciona la nueva fecha de entrega para el artículo:</p>
                <input id="nuevaFecha" type="date" class="swal2-input" value="${prestamo.fechaEntrega}">
            `,
            confirmButtonText: "Guardar prórroga",
            cancelButtonText: "Cancelar",
            showCancelButton: true,
            preConfirm: () => {
                const nuevaFecha = document.getElementById("nuevaFecha").value;
                if (!nuevaFecha) {
                    Swal.showValidationMessage("Debes seleccionar una nueva fecha");
                    return false;
                }
                return nuevaFecha;
            }
        }).then(result => {
            if (result.isConfirmed) {
                prestamo.fechaEntrega = result.value;
                guardarPrestamos(prestamos);
                mostrarPrestamos();

                Toast.fire({
                    icon: "success",
                    title: "Prórroga registrada correctamente"
                });
            }
        });
    };

    // Enviar notificación (solo demo visual)
    const enviarNotificacion = (index) => {
        const prestamos = obtenerPrestamos();
        const prestamo = prestamos[index];

        Swal.fire({
            icon: "info",
            title: "Notificación enviada",
            text: `Se notificó a ${prestamo.nombre} ${prestamo.apellido} (${prestamo.correo}) sobre su préstamo.`,
            confirmButtonText: "Aceptar"
        });
    };

    // Eventos
    tabla.addEventListener("click", (e) => {
        if (e.target.classList.contains("prorroga")) {
            const index = e.target.dataset.index;
            gestionarProrroga(index);
        }
        if (e.target.classList.contains("notificar")) {
            const index = e.target.dataset.index;
            enviarNotificacion(index);
        }
    });

    // Inicialización
    mostrarPrestamos();
});
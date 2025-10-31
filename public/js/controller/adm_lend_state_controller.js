document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("formularioEntrega");
    const tabla = document.querySelector("#tabla-reportes tbody") || document.querySelector("#tabla-reportes");
    const formFiltro = document.getElementById("form-filtro");


    // Configurar Toast SweetAlert2
    const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: toast => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
        }
    });

    // Clave donde se guardarán los préstamos
    const KEY = "prestamosUsuarios";

    // Función para obtener préstamos guardados
    const obtenerPrestamos = () => JSON.parse(localStorage.getItem(KEY)) || [];

    // Función para guardar préstamos
    const guardarPrestamos = data => localStorage.setItem(KEY, JSON.stringify(data));

    // Evento de envío de formulario
    form?.addEventListener("submit", e => {
        e.preventDefault();

        // 1️⃣ Obtener usuario actual
        const emailUsuario = localStorage.getItem("usuarioActual");

        if (!emailUsuario) {
            Toast.fire({
                icon: "error",
                title: "No hay un usuario activo",
                text: "Inicia sesión antes de registrar un préstamo"
            });
            return;
        }

        // 2️⃣ Buscar los datos del usuario
        const usuarioDatos = JSON.parse(localStorage.getItem(emailUsuario));
        if (!usuarioDatos) {
            Toast.fire({
                icon: "error",
                title: "Datos de usuario no encontrados",
                text: "Verifica tu registro o sesión"
            });
            return;
        }

        // 3️⃣ Obtener datos del formulario
        const articuloSelect = form.querySelector('select[name="tipo_articulo"]');
        const fechaInput = form.querySelector('input[type="date"]');

        const articulo = articuloSelect.value.trim();
        const fechaEntrega = fechaInput.value;

        const articuloTexto = articuloSelect.options[articuloSelect.selectedIndex].textContent.trim();

        if (!articuloTexto || !fechaEntrega) {
            Toast.fire({
                icon: "warning",
                title: "Completa todos los campos"
            });
            return;
        }

        // 4️⃣ Crear nuevo registro de préstamo
        const nuevoPrestamo = {
            articulo: articuloTexto,
            fechaEntrega,
            nombre: usuarioDatos.nombre || "",
            apellido: usuarioDatos.apellido || "",
            correo: usuarioDatos.email,
            celular: usuarioDatos.celular || ""
        };

        // 5️⃣ Guardar en localStorage
        const prestamos = obtenerPrestamos();
        prestamos.push(nuevoPrestamo);
        guardarPrestamos(prestamos);

        // 6️⃣ Notificar al usuario
        Toast.fire({
            icon: "success",
            title: "Solicitud enviada correctamente"
        });

        form.reset();
    });

     // Mostrar datos en tabla
    const mostrarPrestamos = (filtroNombre = "", filtroFecha = "") => {
    console.log("Mostrando préstamos con filtros:", filtroNombre, filtroFecha);

    const prestamos = obtenerPrestamos();
    tabla.innerHTML = "";

    // Filtrado combinado
    const filtrados = prestamos.filter(r => {
        const coincideNombre = r.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
        const coincideFecha = !filtroFecha || new Date(r.fechaEntrega) >= new Date(filtroFecha);
        return coincideNombre && coincideFecha;
    });

    if (filtrados.length === 0) {
        tabla.innerHTML = `<tr><td colspan="6">No se encontraron préstamos</td></tr>`;
        return;
    }

    filtrados.forEach((r, index) => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${r.nombre}</td>
            <td>${r.apellido}</td>
            <td>${r.correo}</td>
            <td>${r.telefono || r.celular || ""}</td>
            <td>${r.fechaEntrega || "-"}</td>
            <td>
                <button type="button" class="editar" data-index="${index}">Editar</button>
                <button type="button" class="eliminar" data-index="${index}">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
};


     // Editar registro
    const editarReporte = (index, actualizado) => {
        const reportes = obtenerPrestamos();
        reportes[index] = actualizado;
        guardarPrestamos(reportes);
        mostrarPrestamos();
        Toast.fire({
            icon: "info",
            title: "Reporte actualizado"
        });
    };

    // Eliminar registro
    const eliminarReporte = (index) => {
        const reportes = obtenerPrestamos();
        reportes.splice(index, 1);
        guardarPrestamos(reportes);
        mostrarPrestamos();
        Toast.fire({
            icon: "error",
            title: "Reporte eliminado"
        });
    };

    // ====== EVENTOS ======
    tabla.addEventListener("click", (e) => {
        if (e.target.classList.contains("eliminar")) {
            const index = e.target.dataset.index;
            eliminarReporte(index);
        }

        if (e.target.classList.contains("editar")) {
            const index = e.target.dataset.index;
            const reporte = obtenerPrestamos()[index];

            Swal.fire({
                title: "Editar usuario",
                html: `
                    <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${reporte.nombre}">
                    <input id="swal-apellido" class="swal2-input" placeholder="Apellido" value="${reporte.apellido}">
                    <input id="swal-correo" class="swal2-input" placeholder="Correo" value="${reporte.correo}">
                    <input id="swal-celular" class="swal2-input" placeholder="Celular" value="${reporte.celular}">
                `,
                confirmButtonText: "Guardar cambios",
                focusConfirm: false,
                preConfirm: () => {
                    return {
                        nombre: document.getElementById("swal-nombre").value,
                        apellido: document.getElementById("swal-apellido").value,
                        correo: document.getElementById("swal-correo").value,
                        celular: document.getElementById("swal-celular").value
                    };
                }
            }).then(result => {
                if (result.isConfirmed) {
                    editarReporte(index, result.value);
                }
            });
        }
    });

    // Filtro por nombre
    formFiltro.addEventListener("submit", e => {
        e.preventDefault();
        const filtro = document.getElementById("filtro_nom").value;
        const filtroFecha = document.getElementById("filtro-fecha").value;
        mostrarPrestamos(filtro, filtroFecha);
    });

    // ====== Inicializar ======
    // Si no hay datos en localStorage, cargamos los ejemplos iniciales
    // if (mostrarPrestamos().length === 0) {
    //     guardarPrestamos([
    //         { nombre: "Wilder", apellido: "Garcia", correo: "Wilder.garciaramirez@gmail.com", telefono: "3136980570" },
    //         { nombre: "Sara", apellido: "Puerta", correo: "Exampol.gmail.com", telefono: "3136980570" }
    //     ]);
    // }

    mostrarPrestamos();


});

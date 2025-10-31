document.addEventListener("DOMContentLoaded", () => {
    const tabla = document.querySelector("#tabla-reportes tbody") || document.querySelector("#tabla-reportes");
    const formFiltro = document.getElementById("form-filtro");

    // Configuración del toast
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

    // ====== CRUD LocalStorage ======
    const KEY = "reportesUsuarios";

    // Obtener datos del localStorage
    const obtenerReportes = () => JSON.parse(localStorage.getItem(KEY)) || [];

    // Guardar datos
    const guardarReportes = data => localStorage.setItem(KEY, JSON.stringify(data));

    // Mostrar datos en tabla
    const mostrarReportes = (filtro = "") => {
        const reportes = obtenerReportes();
        tabla.innerHTML = "";

        const filtrados = reportes.filter(r =>
            r.nombre.toLowerCase().includes(filtro.toLowerCase())
        );

        if (filtrados.length === 0) {
            tabla.innerHTML = `<tr><td colspan="5">No se encontraron reportes</td></tr>`;
            return;
        }

        filtrados.forEach((r, index) => {
            const fila = document.createElement("tr");
            fila.innerHTML = `
                <td>${r.nombre}</td>
                <td>${r.apellido}</td>
                <td>${r.correo}</td>
                <td>${r.telefono}</td>
                <td>
                    <button type="button" class="editar" data-index="${index}">Editar</button>
                    <button type="button" class="eliminar" data-index="${index}">Eliminar</button>
                </td>
            `;
            tabla.appendChild(fila);
        });
    };

    // Crear nuevo registro
    const agregarReporte = (nuevo) => {
        const reportes = obtenerReportes();
        reportes.push(nuevo);
        guardarReportes(reportes);
        mostrarReportes();
        Toast.fire({
            icon: "success",
            title: "Reporte agregado correctamente"
        });
    };

    // Editar registro
    const editarReporte = (index, actualizado) => {
        const reportes = obtenerReportes();
        reportes[index] = actualizado;
        guardarReportes(reportes);
        mostrarReportes();
        Toast.fire({
            icon: "info",
            title: "Reporte actualizado"
        });
    };

    // Eliminar registro
    const eliminarReporte = (index) => {
        const reportes = obtenerReportes();
        reportes.splice(index, 1);
        guardarReportes(reportes);
        mostrarReportes();
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
            const reporte = obtenerReportes()[index];

            Swal.fire({
                title: "Editar usuario",
                html: `
                    <input id="swal-nombre" class="swal2-input" placeholder="Nombre" value="${reporte.nombre}">
                    <input id="swal-apellido" class="swal2-input" placeholder="Apellido" value="${reporte.apellido}">
                    <input id="swal-correo" class="swal2-input" placeholder="Correo" value="${reporte.correo}">
                    <input id="swal-telefono" class="swal2-input" placeholder="Teléfono" value="${reporte.telefono}">
                `,
                confirmButtonText: "Guardar cambios",
                focusConfirm: false,
                preConfirm: () => {
                    return {
                        nombre: document.getElementById("swal-nombre").value,
                        apellido: document.getElementById("swal-apellido").value,
                        correo: document.getElementById("swal-correo").value,
                        telefono: document.getElementById("swal-telefono").value
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
        mostrarReportes(filtro);
    });

    // ====== Inicializar ======
    // Si no hay datos en localStorage, cargamos los ejemplos iniciales
    // if (obtenerReportes().length === 0) {
    //     guardarReportes([
    //         { nombre: "Wilder", apellido: "Garcia", correo: "Wilder.garciaramirez@gmail.com", telefono: "3136980570" },
    //         { nombre: "Sara", apellido: "Puerta", correo: "Exampol.gmail.com", telefono: "3136980570" }
    //     ]);
    // }

    mostrarReportes();
});

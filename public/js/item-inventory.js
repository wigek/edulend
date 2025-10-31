// Referencias a los elementos del formulario y tabla
const form = document.querySelector('.form-horizontal');
const tabla = document.querySelector('#tabla-inventario tbody');

// Cargar inventario desde localStorage
document.addEventListener('DOMContentLoaded', mostrarInventario);

form.addEventListener('submit', (e) => {
    e.preventDefault();

    const articulo = document.querySelector('#articulo').value.trim();
    const cantidad = parseInt(document.querySelector('#cantidad').value);

    if (!articulo || cantidad <= 0) {
        alert('Por favor ingresa un nombre válido y una cantidad mayor a cero.');
        return;
    }

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


    const nuevoItem = {
        articulo,
        cantidad,
        cedula: usuarioDatos.cedula,
        nombre: usuarioDatos.nombre,
        fechaIngreso: new Date().toLocaleDateString(),
        fechaEntrega: calcularFechaEntrega(),
        estado: 'En buen estado'
    };

    guardarEnLocalStorage(nuevoItem);
    form.reset();
    mostrarInventario();
});

// Función para calcular una fecha límite (7 días)
function calcularFechaEntrega() {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 7);
    return fecha.toLocaleDateString();
}

// Guardar en localStorage
function guardarEnLocalStorage(item) {
    const inventario = JSON.parse(localStorage.getItem('inventario')) || [];
    inventario.push(item);
    localStorage.setItem('inventario', JSON.stringify(inventario));
}

// Mostrar los elementos guardados
function mostrarInventario() {
    const inventario = JSON.parse(localStorage.getItem('inventario')) || [];
    tabla.innerHTML = ''; // Limpiar tabla antes de mostrar

    inventario.forEach((item, index) => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${item.articulo} (${item.cantidad})</td>
            <td>${item.fechaIngreso}</td>
            <td>${item.fechaEntrega}</td>
            <td>${item.estado}</td>
            <td>
                <button onclick="editarItem(${index})">Editar</button>
                <button onclick="eliminarItem(${index})">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

// Eliminar un artículo
function eliminarItem(index) {
    const inventario = JSON.parse(localStorage.getItem('inventario')) || [];
    inventario.splice(index, 1);
    localStorage.setItem('inventario', JSON.stringify(inventario));
    mostrarInventario();
}

// Editar un artículo
function editarItem(index) {
    const inventario = JSON.parse(localStorage.getItem('inventario')) || [];
    const item = inventario[index];

    Swal.fire({
        title: 'Editar artículo',
        html: `
            <input id="swal-articulo" class="swal2-input" placeholder="Nombre del artículo" value="${item.articulo}">
            <input id="swal-cantidad" type="number" class="swal2-input" placeholder="Cantidad" value="${item.cantidad}">
        `,
        confirmButtonText: 'Guardar cambios',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        focusConfirm: false,
        preConfirm: () => {
            const nuevoNombre = document.getElementById('swal-articulo').value.trim();
            const nuevaCantidad = parseInt(document.getElementById('swal-cantidad').value.trim());

            if (!nuevoNombre || isNaN(nuevaCantidad) || nuevaCantidad < 0) {
                Swal.showValidationMessage('Por favor, ingresa un nombre válido y una cantidad positiva');
                return false;
            }

            return { nuevoNombre, nuevaCantidad };
        }
    }).then(result => {
        if (result.isConfirmed) {
            const { nuevoNombre, nuevaCantidad } = result.value;
            item.articulo = nuevoNombre;
            item.cantidad = nuevaCantidad;
            localStorage.setItem('inventario', JSON.stringify(inventario));

            Swal.fire({
                icon: 'success',
                title: 'Artículo actualizado',
                text: `El artículo "${nuevoNombre}" se actualizó correctamente.`,
                timer: 1500,
                showConfirmButton: false
            });

            mostrarInventario();
        }
    });
}


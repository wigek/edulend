
const form = document.querySelector('.form-horizontal');
const tabla = document.querySelector('#tabla-inventario tbody');

document.addEventListener('DOMContentLoaded', mostrarInventario);


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const articulo = document.querySelector('#articulo').value.trim();
    const cantidad = parseInt(document.querySelector('#cantidad').value);

    if (!articulo || cantidad <= 0) {
        alert('Por favor ingresa un nombre válido y una cantidad mayor a cero.');
        return;
    }

    const nuevoItem = {
        articulo,
        cantidad,
        fechaIngreso: new Date().toLocaleDateString(),
        fechaEntrega: calcularFechaEntrega(),
        estado: 'En buen estado'
    };

    guardarEnLocalStorage(nuevoItem);
    form.reset();
    mostrarInventario();
});

function calcularFechaEntrega() {
    const fecha = new Date();
    fecha.setDate(fecha.getDate() + 7);
    return fecha.toLocaleDateString();
}

function guardarEnLocalStorage(item) {
    const inventario = JSON.parse(localStorage.getItem('inventario')) || [];
    inventario.push(item);
    localStorage.setItem('inventario', JSON.stringify(inventario));
}

function mostrarInventario() {
    const inventario = JSON.parse(localStorage.getItem('inventario')) || [];
    tabla.innerHTML = ''; 

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
function eliminarItem(index) {
    const inventario = JSON.parse(localStorage.getItem('inventario')) || [];
    inventario.splice(index, 1);
    localStorage.setItem('inventario', JSON.stringify(inventario));
    mostrarInventario();
}
function editarItem(index) {
    const inventario = JSON.parse(localStorage.getItem('inventario')) || [];
    const item = inventario[index];

    const nuevoNombre = prompt('Nuevo nombre del artículo:', item.articulo);
    const nuevaCantidad = prompt('Nueva cantidad:', item.cantidad);

    if (nuevoNombre && nuevaCantidad) {
        item.articulo = nuevoNombre;
        item.cantidad = parseInt(nuevaCantidad);
        localStorage.setItem('inventario', JSON.stringify(inventario));
        mostrarInventario();
    }
}

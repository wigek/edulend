// Datos
const estadoEquipos = {
    'En reparación': 1,
    'Disponibles': 15,
    'Prestados': 20,
    'En mora': 2
};

// Convertir a formato Plotly
const datos = Object.entries(estadoEquipos).map(([estado, cantidad]) => ({
    x: [estado],
    y: [cantidad],
    name: estado,
    type: 'bar'
}));

// Layout del gráfico
const layout = {
    title: 'Estado de los Equipos',
    xaxis: { title: 'Estado' },
    yaxis: { title: 'Cantidad' },
    barmode: 'group',
    legend: { title: { text: 'Estados' } }
};

// Renderizar en el div
Plotly.newPlot('grafico', datos, layout);
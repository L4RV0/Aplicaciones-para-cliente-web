const formularioTareas = document.getElementById('formulario-tareas');
const tituloTarea = document.getElementById('titulo-tarea');
const descripcionTarea = document.getElementById('descripcion-tarea');
const listaTareas = document.getElementById('lista-tareas');

const btnExportarJson = document.getElementById('btn-exportar-json');
const btnExportarXml = document.getElementById('btn-exportar-xml');

let coleccionTareas =
JSON.parse(localStorage.getItem('tareasGuardadas')) || [];

function redibujarInterfaz() {

    listaTareas.innerHTML = '';

    coleccionTareas.forEach((tarea, indice) => {

        const elementoLista = document.createElement('li');

        elementoLista.className = 'elemento-tarea';

        elementoLista.innerHTML = `
        <div>
            <h3>${tarea.titulo}</h3>
            <p>${tarea.descripcion}</p>
            <small>
                Código: ${tarea.codigo}
                | Fecha: ${tarea.fecha}
            </small>
        </div>

        <button class="btn-eliminar"
            onclick="removerTarea(${indice})">
            Eliminar
        </button>
        `;

        listaTareas.appendChild(elementoLista);
    });
}

function actualizarAlmacenamientoLocal() {

    localStorage.setItem(
        'tareasGuardadas',
        JSON.stringify(coleccionTareas)
    );
}

formularioTareas.addEventListener('submit', (evento) => {

    evento.preventDefault();

    const nuevaTarea = {
        codigo: Date.now().toString(),
        titulo: tituloTarea.value,
        descripcion: descripcionTarea.value,
        fecha: new Date().toLocaleDateString()
    };

    coleccionTareas.push(nuevaTarea);

    actualizarAlmacenamientoLocal();

    redibujarInterfaz();

    formularioTareas.reset();
});

window.removerTarea = function(indice) {

    coleccionTareas.splice(indice, 1);

    actualizarAlmacenamientoLocal();

    redibujarInterfaz();
};

btnExportarJson.addEventListener('click', () => {

    if (coleccionTareas.length === 0) {
        alert('No existen tareas para exportar');
        return;
    }

    const textoJson =
    JSON.stringify(coleccionTareas, null, 2);

    generarDescarga(
        textoJson,
        'tareas_academicas.json',
        'application/json'
    );
});

btnExportarXml.addEventListener('click', () => {

    if (coleccionTareas.length === 0) {
        alert('No existen tareas para exportar');
        return;
    }

    let textoXml =
`<?xml version="1.0" encoding="UTF-8"?>
<tareas>
`;

    coleccionTareas.forEach(tarea => {

        textoXml += `
<tarea codigo="${tarea.codigo}">
    <titulo>${tarea.titulo}</titulo>
    <descripcion>${tarea.descripcion}</descripcion>
    <fecha>${tarea.fecha}</fecha>
</tarea>
`;
    });

    textoXml += `</tareas>`;

    generarDescarga(
        textoXml,
        'tareas_academicas.xml',
        'application/xml'
    );
});

function generarDescarga(contenidoTexto, nombreArchivo, tipoMime) {

    const blob =
    new Blob([contenidoTexto], { type: tipoMime });

    const url =
    URL.createObjectURL(blob);

    const enlace =
    document.createElement('a');

    enlace.href = url;
    enlace.download = nombreArchivo;
    enlace.click();

    URL.revokeObjectURL(url);
}

redibujarInterfaz();
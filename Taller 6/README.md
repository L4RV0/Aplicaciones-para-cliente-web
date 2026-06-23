# Taller 6 - CRUD de Gestion de Libros

## Descripcion

Este proyecto es una aplicacion web sencilla desarrollada con HTML, CSS y JavaScript. Su objetivo es practicar la manipulacion del DOM, el manejo de eventos y la persistencia de datos en el navegador mediante `localStorage`.

La aplicacion permite gestionar un inventario basico de libros, realizando las cuatro operaciones principales de un CRUD:

- Crear libros.
- Leer o listar libros registrados.
- Actualizar la informacion de un libro.
- Eliminar libros.

## Objetivo del taller

Comprender el flujo de una aplicacion front-end que administra datos locales, usando un formulario, una tabla HTML y funciones de JavaScript para modificar el estado de la aplicacion.

## Estructura del proyecto

```text
Taller 6/
|-- index.html
|-- styles.css
|-- script.js
`-- README.md
```

## Archivos principales

### `index.html`

Contiene la estructura semantica de la aplicacion. Incluye:

- Encabezado del proyecto.
- Formulario para agregar o editar libros.
- Campo oculto para guardar el ID del libro que se esta editando.
- Tabla para mostrar el listado de libros.
- Enlace al archivo `styles.css`.
- Enlace al archivo `script.js`.

### `styles.css`

Define el aspecto visual de la aplicacion. Incluye:

- Variables CSS para los colores principales.
- Diseno responsive con CSS Grid.
- Estilos para el formulario.
- Estilos para la tabla.
- Colores diferenciados para botones de guardar, editar, cancelar y eliminar.

### `script.js`

Contiene la logica del CRUD. Sus responsabilidades principales son:

- Obtener datos guardados desde `localStorage`.
- Renderizar los libros en la tabla.
- Crear nuevos libros.
- Preparar un libro para edicion.
- Actualizar libros existentes.
- Eliminar libros con confirmacion.
- Reiniciar el formulario.
- Guardar los cambios en `localStorage`.

## Funcionamiento del CRUD

### Crear

El usuario escribe el titulo y el autor del libro en el formulario. Al presionar `Guardar Libro`, JavaScript crea un objeto con un ID unico y lo agrega al arreglo `libros`.

### Leer

La funcion `renderizarLibros()` recorre el arreglo `libros` y construye dinamicamente las filas de la tabla. Si no existen registros, se muestra el mensaje `No hay libros registrados.`

### Actualizar

Al presionar el boton `Editar`, los datos del libro seleccionado se cargan en el formulario. El boton cambia a `Actualizar Libro`. Al enviar el formulario, se modifica el registro correspondiente.

### Eliminar

Al presionar el boton `Eliminar`, se muestra una confirmacion. Si el usuario acepta, el libro se elimina del arreglo y la tabla se actualiza.

## Persistencia de datos

Los datos se guardan en el navegador usando `localStorage` con la clave:

```js
listaLibros
```

Esto permite que los libros registrados permanezcan disponibles aunque se recargue la pagina.

## Como ejecutar el proyecto

### Opcion 1: Abrir directamente

Abrir el archivo `index.html` en el navegador.

### Opcion 2: Usar servidor local

Desde la carpeta del proyecto, ejecutar:

```powershell
python -m http.server 8000 --bind 127.0.0.1
```

Luego abrir en el navegador:

```text
http://127.0.0.1:8000/index.html
```

## Tecnologias utilizadas

- HTML5
- CSS3
- JavaScript
- DOM
- localStorage

## Pruebas sugeridas

1. Agregar un libro con titulo y autor.
2. Confirmar que aparece en la tabla.
3. Recargar la pagina y verificar que el libro sigue guardado.
4. Editar el libro y confirmar que la tabla se actualiza.
5. Eliminar el libro y confirmar que aparece el mensaje de tabla vacia.

## Conclusiones

Este taller permite practicar conceptos esenciales de desarrollo web front-end. La aplicacion demuestra como conectar una interfaz HTML con JavaScript para administrar datos, actualizar el DOM y conservar informacion localmente en el navegador.

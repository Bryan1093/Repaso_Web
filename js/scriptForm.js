function mostrarMensaje(texto, tipo) {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = texto;
    mensajeDiv.className = 'message ' + tipo;
    mensajeDiv.style.display = 'block';
    setTimeout(() => {
        mensajeDiv.style.display = 'none';
    }, 5000);
}

function guardarDatos() {
    const cedula = document.getElementById('cedula').value.trim();
    const nombre = document.getElementById('nombre').value.trim();
    const apellido = document.getElementById('apellido').value.trim();

    if (!cedula || !nombre || !apellido) {
        mostrarMensaje("Por favor, complete todos los campos.", "error");
        return;
    }

    const datos = {
        cedula: cedula,
        nombre: nombre,
        apellido: apellido
    };

    const jsonStr = JSON.stringify(datos, null, 2);
    console.log(jsonStr); // Para verlo en consola
    mostrarMensaje("Datos guardados como JSON:\n" + jsonStr, "success");

    //Limpiar el formulario
    document.getElementById('cedula').value = '';
    document.getElementById('nombre').value = '';
    document.getElementById('apellido').value = '';s
}

function cargarDesdeJSON() {
    const jsonInput = document.getElementById('jsonInput').value.trim();

    if (!jsonInput) {
        mostrarMensaje("Por favor, ingrese un JSON válido.", "error");
        return;
    }

    try {
        const datos = JSON.parse(jsonInput);

        if (!datos.cedula || !datos.nombre || !datos.apellido) {
            throw new Error("El JSON debe contener las propiedades: cedula, nombre y apellido.");
        }

        document.getElementById('cedula').value = datos.cedula;
        document.getElementById('nombre').value = datos.nombre;
        document.getElementById('apellido').value = datos.apellido;

        mostrarMensaje("Datos cargados desde JSON correctamente.", "success");

    } catch (error) {
        mostrarMensaje("Error al procesar el JSON: " + error.message, "error");
    }
}
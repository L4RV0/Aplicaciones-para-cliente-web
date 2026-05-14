document.getElementById('registroForm').addEventListener('submit', function(e) {

    e.preventDefault();

    // Limpiar errores anteriores
    document.querySelectorAll('.error').forEach(el => el.innerText = '');

    let esValido = true;

    // VALIDAR NOMBRE
    const nombre = document.getElementById('nombre').value;
    const regexNombre = /^[a-zA-ZÁÉÍÓÚáéíóúñÑ ]+$/;

    if (!regexNombre.test(nombre)) {
        document.getElementById('errorNombre').innerText =
            "El nombre solo debe contener letras.";

        esValido = false;
    }

    // VALIDAR EMAIL
    const email = document.getElementById('email').value;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regexEmail.test(email)) {
        document.getElementById('errorEmail').innerText =
            "Ingrese un correo electrónico válido.";

        esValido = false;
    }

    // VALIDAR CONTRASEÑA
    const pass = document.getElementById('password').value;
    const regexPass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    if (!regexPass.test(pass)) {
        document.getElementById('errorPass').innerText =
            "La contraseña debe tener 8 caracteres, una mayúscula y un número.";

        esValido = false;
    }

    // SI TODO ESTÁ CORRECTO
    if (esValido) {
        alert("¡Formulario enviado con éxito!");
        this.reset();
    }

});
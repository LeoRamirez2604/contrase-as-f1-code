document.addEventListener("DOMContentLoaded", () => {
    const loginModal = document.getElementById("loginModal");
    const loginForm = document.getElementById("loginForm");
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");
    const usernameError = document.getElementById("usernameError");
    const passwordError = document.getElementById("passwordError");
    const logoutButton = document.getElementById("logoutButton");

    // Modal de recuperación de contraseña
    const recuperarModal = document.getElementById("recuperarModal");
    const recuperarCorreoInput = document.getElementById("recuperarCorreo");
    const recuperarError = document.getElementById("recuperarError");
    const enviarCorreoButton = document.getElementById("enviarCorreoButton");

    // Enlace de recuperación de contraseña
    const recuperarContraseñaLink = document.getElementById("recuperarContraseña");

    // Cargar usuario al inicio si existe en sessionStorage
    const usuarioGuardado = JSON.parse(sessionStorage.getItem('usuario'));
    if (usuarioGuardado) {
        loginModal.classList.add("hidden");
        manejarAccesoPorRol(usuarioGuardado);
    } else {
        loginModal.classList.remove("hidden");
    }

    // Iniciar sesión
    loginForm.addEventListener("submit", (event) => {
        event.preventDefault();
        
        // Resetear mensajes de error
        usernameError.style.display = "none";
        passwordError.style.display = "none";
        
        let isValid = true;

        // Valores de usuario y contraseña esperados
        const expectedUsername = "Leonardo";
        const expectedPassword = "Rayados1";

        // Validación del username
        if (usernameInput.value !== expectedUsername) {
            usernameError.textContent = "Usuario incorrecto.";
            usernameError.style.display = "block";
            isValid = false;
        }

        // Validación de la contraseña
        if (passwordInput.value !== expectedPassword) {
            passwordError.textContent = "Contraseña incorrecta.";
            passwordError.style.display = "block";
            isValid = false;
        }

        // Si es válido, cerrar el modal y crear objeto de usuario
        if (isValid) {
            const usuario = {
                nombre: usernameInput.value,
                rol: "admin" // Cambiar según tu lógica de roles
            };
            sessionStorage.setItem('usuario', JSON.stringify(usuario)); // Guardar en sessionStorage
            alert("¡Inicio de sesión exitoso!");
            loginModal.classList.add("hidden");
            manejarAccesoPorRol(usuario); // Llamar a la función para manejar la vista
        }
    });

    // Mostrar modal de recuperación de contraseña
    recuperarContraseñaLink.addEventListener("click", (event) => {
        event.preventDefault();
        loginModal.classList.add("hidden"); // Ocultar el modal de login
        recuperarModal.classList.remove("hidden"); // Mostrar el modal de recuperación
    });

    // Enviar correo para recuperación de contraseña
    enviarCorreoButton.addEventListener("click", (event) => {
        event.preventDefault();

        // Validar el correo ingresado
        const correo = recuperarCorreoInput.value.trim();
        if (!correo || !isEmailValido(correo)) {
            recuperarError.textContent = "Por favor ingrese un correo válido.";
            recuperarError.style.display = "block";
            return;
        }

        // Simular el envío de un correo de recuperación
        alert("Instrucciones de recuperación enviadas a: " + correo);
        recuperarModal.classList.add("hidden");
        loginModal.classList.remove("hidden"); // Volver al login
    });

    // Función para validar formato de correo
    function isEmailValido(email) {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

    // Manejar el botón de Cerrar sesión
    logoutButton.addEventListener("click", () => {
        sessionStorage.removeItem('usuario'); // Borrar la sesión
        alert("Sesión cerrada");
        loginModal.classList.remove("hidden"); // Mostrar modal de login
        recuperarModal.classList.add("hidden"); // Asegurarnos de que el modal de recuperación esté oculto
    });
});

function manejarAccesoPorRol(usuario) {
    if (!usuario || !usuario.rol) return;

    // Ejemplo de restricción y cambios visuales
    const enlacesAdmin = document.querySelectorAll('.admin-only');
    const enlacesCliente = document.querySelectorAll('.cliente-only');

    if (usuario.rol === 'admin') {
        enlacesCliente.forEach(el => el.style.display = 'none');
        // Cambios visuales específicos para admin
        document.body.style.backgroundColor = '#f0f0f0';
    } else if (usuario.rol === 'cliente') {
        enlacesAdmin.forEach(el => el.style.display = 'none');
        // Cambios visuales específicos para cliente
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const cerrarSesionBtn = document.getElementById("cerrarSesionBtn");

    cerrarSesionBtn.addEventListener("click", () => {
        sessionStorage.removeItem("usuario");
        alert("Has cerrado sesión correctamente.");
        window.location.href = "index.html";
    });
});

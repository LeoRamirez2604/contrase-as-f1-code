document.addEventListener("DOMContentLoaded", () => {
    // Obtener el usuario actual del almacenamiento local
    const usuario = JSON.parse(localStorage.getItem('usuario'));

    // Verificar si el usuario ha iniciado sesión
    if (!usuario) {
        alert('Debe iniciar sesión para acceder a esta página.');
        window.location.href = 'index.html'; // Redirige al inicio si no está autenticado
        return;
    }

    // Validar el rol del usuario
    if (usuario.rol === 'admin') {
        console.log('Acceso concedido: Administrador');
    } else if (usuario.rol === 'cliente') {
        console.log('Acceso concedido: Cliente');
    } else {
        alert('No tiene permiso para acceder a esta página.');
        window.location.href = 'index.html'; // Redirige si el rol no es válido
    }
});

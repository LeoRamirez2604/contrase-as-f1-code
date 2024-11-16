// Función para mostrar los productos del carrito
function mostrarProductosCarrito() {
    const carritoContainer = document.querySelector('.carrito-items');
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    // Limpiar el contenedor antes de mostrar los productos
    carritoContainer.innerHTML = '';

    if (carrito.length === 0) {
        carritoContainer.innerHTML = '<p>El carrito está vacío.</p>';
        return;
    }

    // Crear una lista de productos en el carrito
    carrito.forEach(producto => {
        const productoDiv = document.createElement('div');
        productoDiv.classList.add('producto-carrito');
        productoDiv.innerHTML = `
            <p>Producto: ${producto.nombre}</p>
            <p>Precio: $${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
        `;
        carritoContainer.appendChild(productoDiv);
    });
}

// Función para vaciar el carrito
function vaciarCarrito() {
    localStorage.removeItem('carrito');
    mostrarProductosCarrito(); // Actualiza la vista después de vaciar
    alert("El carrito ha sido vaciado.");
}

// Función para calcular el total del carrito
function calcularTotalCarrito() {
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    let total = carrito.reduce((acumulado, producto) => acumulado + (producto.precio * producto.cantidad), 0);
    alert(`El total de tu carrito es: $${total.toFixed(2)}`);
}

// Asignar eventos a los botones
document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);
document.getElementById('calcular-total').addEventListener('click', calcularTotalCarrito);

// Mostrar los productos al cargar la página
document.addEventListener('DOMContentLoaded', mostrarProductosCarrito);

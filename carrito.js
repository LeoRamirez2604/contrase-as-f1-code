// carrito.js

// Obtener el carrito del localStorage
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

// Seleccionar el contenedor donde se mostrarán los productos
const carritoItems = document.querySelector('.carrito-items');
const totalElement = document.getElementById('total');

// Función para mostrar los productos en el carrito
function mostrarCarrito() {
    carritoItems.innerHTML = ''; // Limpiar contenido previo
    let total = 0;

    carrito.forEach(producto => {
        const item = document.createElement('div');
        item.classList.add('carrito-item');
        item.innerHTML = `
            <p>${producto.nombre}</p>
            <p>$${producto.precio}</p>
            <p>Cantidad: ${producto.cantidad}</p>
            <button class="eliminar-producto" data-nombre="${producto.nombre}">Eliminar</button>
        `;
        carritoItems.appendChild(item);

        // Calcular el total
        total += producto.precio * producto.cantidad;
    });

    // Mostrar total
    totalElement.textContent = total;
}

// Función para eliminar producto del carrito
function eliminarProducto(nombre) {
    carrito = carrito.filter(producto => producto.nombre !== nombre);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
}

// Escuchar clicks en los botones de eliminar
carritoItems.addEventListener('click', (e) => {
    if (e.target.classList.contains('eliminar-producto')) {
        const nombreProducto = e.target.getAttribute('data-nombre');
        eliminarProducto(nombreProducto);
    }
});

// Mostrar carrito al cargar la página
mostrarCarrito();

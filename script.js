// Almacenar el carrito
let carrito = [];

// Verificar si hay productos en el localStorage
if (localStorage.getItem('carrito')) {
    carrito = JSON.parse(localStorage.getItem('carrito'));
}

// Función para actualizar el carrito en el localStorage
function actualizarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

// Seleccionar todos los botones de agregar al carrito
const botonesAgregarCarrito = document.querySelectorAll('.agregar-carrito');

// Añadir evento a cada botón
botonesAgregarCarrito.forEach(boton => {
    boton.addEventListener('click', (e) => {
        const nombreProducto = e.target.getAttribute('data-nombre');
        const precioProducto = parseFloat(e.target.getAttribute('data-precio')); // Asegúrate de parsear a número
        
        // Crear un objeto con el producto
        const producto = {
            nombre: nombreProducto,
            precio: precioProducto,
            cantidad: 1
        };
        
        // Revisar si el producto ya está en el carrito
        const existe = carrito.some(item => item.nombre === producto.nombre);
        if (existe) {
            // Actualizar cantidad si ya está en el carrito
            carrito = carrito.map(item => {
                if (item.nombre === producto.nombre) {
                    item.cantidad++;
                }
                return item;
            });
        } else {
            // Si no está en el carrito, agregarlo
            carrito.push(producto);
        }

        // Actualizar el carrito en localStorage
        actualizarCarrito();

        alert(`${producto.nombre} añadido al carrito!`);
    });
});

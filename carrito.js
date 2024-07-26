fetch('productos.json')
    .then(response => response.json())
    .then(data => {
        listaProductos = data;
        mostrarProductos();
    })
    .catch(error => console.error('Error al cargar el JSON:', error));

function mostrarProductos() {
    const contenedorProductos = document.getElementById('listaProductos');

    listaProductos.forEach(producto => {
        const col = document.createElement('div');
        col.classList.add('col');

        const card = `
            <div class="card" style="width: 90%;">
                <img src="img/Productos/${producto.nombre.replace(/\s+/g, '_')}.jpg" class="card-img-top" alt="${producto.nombre}">
                <div class="card-body">
                    <h5 class="card-title">${producto.nombre}</h5>
                    <p class="card-text">Descripción del producto</p>
                    <span class="precio">$${producto.precio}</span>
                    <a id="${producto.id}" href="#" class="btn btn-primary botonCompra">Comprar</a>
                </div>
            </div>
        `;

        col.innerHTML = card;
        contenedorProductos.appendChild(col);
    });

    agregarEventos();
}

function agregarEventos() {
    let btnCompra = document.querySelectorAll(".botonCompra");
    console.log(btnCompra);

    for (let boton of btnCompra) {
        boton.addEventListener("click", agregarCarrito);
    }
}

let carrito = [];

function agregarCarrito(e) {
    console.log("PRODUCTO AGREGADO: ", e.target);

    let hijo = e.target;
    let padre = hijo.parentNode;
    let abuelo = padre.parentNode;

    let nombreProducto = padre.querySelector("h5").textContent;
    let precioProducto = parseFloat(padre.querySelector("span").textContent.replace("$", ""));
    let imgProducto = abuelo.querySelector("img").src;

    let producto = {
        nombre: nombreProducto,
        precio: precioProducto,
        img: imgProducto,
        cantidad: 1
    };

    let productoEnCarrito = carrito.find(item => item.nombre === producto.nombre);

    if (productoEnCarrito) {
        productoEnCarrito.cantidad += 1;
    } else {
        carrito.push(producto);
    }

    mostrarCarrito();
    calcularTotal();
}

function mostrarCarrito() {
    let tabla = document.getElementById("tbody");
    tabla.innerHTML = "";

    for (let producto of carrito) {
        let fila = document.createElement("tr");
        fila.innerHTML = `<td><img src="${producto.img}" style="width: 50px;"></td>
                          <td><p>${producto.nombre}</p></td>
                          <td><p>${producto.cantidad}</p></td>
                          <td>${producto.precio}$</td>
                          <td><button class="btn btn-danger borrarElemento">x</button></td>`;
        tabla.append(fila);
    }

    let btnBorrar = document.querySelectorAll(".borrarElemento");
    for (let btn of btnBorrar) {
        btn.addEventListener("click", borrarProducto);
    }
}

function borrarProducto(e) {
    console.log("ELEMENTO ELIMINADO: ", e.target);
    let abuelo = e.target.parentNode.parentNode;
    let productoEliminar = abuelo.querySelector("p").textContent;
    abuelo.remove();

    carrito = carrito.filter(producto => producto.nombre !== productoEliminar);
    console.log(carrito);
    calcularTotal();
}

function calcularTotal() {
    let total = 0;
    for (let producto of carrito) {
        total += producto.precio * producto.cantidad * 1.21;
    }
    document.getElementById("total").textContent = total.toFixed(2);
}

let btnCarrito = document.getElementById("mostrar_carrito");
btnCarrito.addEventListener("click", function () {
    let carrito = document.getElementById("carrito");
    carrito.style.display = carrito.style.display === "none" || carrito.style.display === "" ? "block" : "none";
});

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("carrito").style.display = "none";
});

document.getElementById("pagar").addEventListener("click", function () {
    Swal.fire({
        title: '¡Gracias por su compra!',
        text: 'Nos pondremos en contacto por entrega y envío del producto.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
    });
});
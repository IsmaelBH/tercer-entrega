document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    const loginForm = document.getElementById('loginForm');
    const cartItems = document.getElementById('cartItems');
    const totalAmount = document.getElementById('totalAmount');
    const checkoutButton = document.getElementById('checkoutButton');
    let cart = [];
    let total = 0;
    let currentUser = null;

    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const firstName = document.getElementById('firstName').value;
        const lastName = document.getElementById('lastName').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('registerUsername').value;
        const password = document.getElementById('registerPassword').value;

        if (localStorage.getItem(username)) {
            alert('El usuario ya existe. Por favor, elige otro nombre de usuario.');
        } else {
            localStorage.setItem(username, password);
            alert(`Usuario ${username} registrado exitosamente!`);
        }
    });

    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('loginUsername').value;
        const password = document.getElementById('loginPassword').value;

        const storedPassword = localStorage.getItem(username);
        if (storedPassword && storedPassword === password) {
            currentUser = username;
            Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Bienvenido a Beat Masters",
                showConfirmButton: false,
                timer: 1500,
            }).then(() => {
                window.location.href = 'productos.html'; // Redirige a productos.html después de la alerta
            });
        } else {
            Swal.fire({
                position: "top-center",
                icon: "error",
                title: "Usuario o contraseña incorrectos.",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    });

    let carrito = [];

    function agregarCarrito(e) {
        console.log("PRODUCTO AGREGADO: ", e.target);

        let hijo = e.target;
        let padre = hijo.parentNode;
        let abuelo = padre.parentNode;

        let nombreProducto = padre.querySelector("h5").textContent;
        let precioProducto = padre.querySelector("span").textContent;
        let imgProducto = abuelo.querySelector("img").src;

        let producto = {
            nombre: nombreProducto,
            precio: precioProducto,
            img: imgProducto,
            cantidad: 1
        };

        carrito.push(producto);
        mostrarCarrito();
    }

    function mostrarCarrito() {
        let tabla = document.getElementById("tbody");
        tabla.innerHTML = "";

        for (let producto of carrito) {
            let fila = document.createElement("tr");
            fila.innerHTML = `<td><img src="${producto.img}"></td>
                              <td><p>${producto.nombre}</p></td>
                              <td><p>${producto.cantidad}</p></td>
                              <td>${producto.precio}</td>
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
        abuelo.remove();

        let productoEliminar = abuelo.querySelector("p").textContent;

        function sacarDeCarrito(producto) {
            return producto.nombre != productoEliminar;
        }

        let resultadoEliminar = carrito.filter(sacarDeCarrito);
        carrito = resultadoEliminar;
        console.log(carrito);
    }

    let btnCompra = document.querySelectorAll(".botonCompra");

    console.log(btnCompra);

    for (let boton of btnCompra) {
        boton.addEventListener("click", agregarCarrito);
    }

    let btnCarrito = document.getElementById("mostrar_carrito");

    btnCarrito.addEventListener("click", function () {
        let carrito = document.getElementById("carrito");
        carrito.style.display = carrito.style.display != "none" ? "none" : "block";
    });
});
const frutas = [
    {
        id: 1,
        nombre: "anana",
        precio: 10,
        ruta_img :  "../img/anana.jpg"
    },
    {id: 2,nombre: "arandano",precio: 15,ruta_img :  "../img/arandano.jpg"},
    {id: 3,nombre: "banana",precio: 20,ruta_img :  "../img/banana.jpg" },
    {id: 4,nombre: "frambuesa",precio: 40,ruta_img :  "../img/Frambuesa.png"},
    {id: 5,nombre: "frutilla",precio: 80,ruta_img :  "../img/frutilla.jpg"},
    {id: 6,nombre: "kiwi",precio: 100,ruta_img :  "../img/kiwi.jpg"},
    {id: 7, nombre: "mandarina", precio: 34, ruta_img : "../img/mandarina.jpg"},
    {id: 8, nombre: "manzana", precio: 50, ruta_img: "../img/manzana.jpg"},
    {id: 9, nombre: "naranja", precio: 12, ruta_img: "../img/naranja.jpg"},
    {id: 10, nombre: "pera", precio: 32, ruta_img: "../img/pera.jpg"},
    {id: 11, nombre: "pomelo amarillo", precio: 25, ruta_img: "../img/pomelo-amarillo.jpg"},
    {id: 12, nombre: "pomelo rojo", precio: 25, ruta_img: "../img/pomelo-rojo.jpg"},
    {id: 13, nombre: "sandia", precio: 90, ruta_img: "../img/sandia.jpg"},
]; 

const alumno = {
    dni: 45076943,
    nombre: "César",
    apellido: "Pumacayo"
    
}
//----------------------------------------------
//                  Variables 
//----------------------------------------------
let navegador = document.querySelector("nav");
let contenedorFrutas = document.querySelector("#contenedorFrutas");
let barraBusqueda = document.querySelector("#barraBusqueda");
let carrito = []; //creamos el carrito
let contenedorCarrito = document.querySelector("#contenedorCarrito");


//----------------------------------------------
//                  Funciones
//----------------------------------------------
/**
 Función: imprimirDatosAlumno()
 --------------------------------
 - Esta funcion muestra en la consola los datos del alumno (dni, nombre, apellido) y inserta nombre y apellido del alumno dentro del <nav>.
*/
function imprimirDatosAlumno() {
    console.log(`dni: ${alumno.dni}, Nombre: ${alumno.nombre} ${alumno.apellido}`);
    navegador.innerHTML += `
        <h2>${alumno.nombre} ${alumno.apellido}</h2>
        `;

}
/**
 Función: mostrarProductos()
 -------------------------------- 
 - Esta funcion imprime en pantalla los productos frutas del array de objetos que es volcado en el html dentro del contenedorFrutas.
 */
function mostrarProductos(array)
{
    let cartaProducto = ""; 
    array.forEach((fruta) => { 
        cartaProducto+=  `
        <div class="card-producto">
            <img src="${fruta.ruta_img}" alt="${fruta.nombre}">
            <h3>${fruta.nombre}</h3>
            <p>$ ${fruta.precio}</p>
            <button onclick="agregarACarrito(${fruta.id})">Agregar al carrito</button>
        </div>`;
    
    });
    contenedorFrutas.innerHTML = cartaProducto; 
}

//Evento: Cada tecla ingresada ejecutará la funcion filtrarProductos()
barraBusqueda.addEventListener("keyup", () => { 
    filtrarProductos();
} );


/**
 Función: filtrarProductos()
 -------------------------------- 
 - Esta funcion filtra los productos segun el valor de busqueda (texto ingresadov por usuario) que comienzen con dicho valor 
 */
function filtrarProductos() 
{
    let valorBusqueda = barraBusqueda.value.trim().toLowerCase();
    console.log(valorBusqueda);
    let productosFiltrados = frutas.filter(f => f.nombre.toLowerCase().startsWith(valorBusqueda)
    );


    mostrarProductos(productosFiltrados); 
}

/**
 Función: mostrarCarrito()
 -------------------------------- 
 - Esta funcion muestra en pantalla y por consola todos los productos agregados al carrito:
    Un contador que indica la cantidad de productos en el carrito.
    El precio total acumulado de los productos en el carrito.

 - Llama a guardarCarrito() para almacenar los cambios en localStorage y mantener el carrito aunque se recargue la pagina o cierres pagina.

*/
function mostrarCarrito() {

    
    let cartaCarrito = `
        ${carrito.length > 0 ? `<p id="contadorCarrito">Carrito: ${carrito.length} producto${carrito.length !== 1 ? 's' : ''}</p>` : ''}
        <div class="carrito-botones">
            <button onclick="ordenarCarritoPorNombre()">Ordenar por nombre</button>
            <button onclick="ordenarCarritoPorPrecio()">Ordenar por precio</button>

        </div>
        <ul>
    `;

    carrito.forEach((elemento, indice) => { 
        cartaCarrito += `
            <li class="bloque-item">
                <p class="nombre-item">${elemento.nombre} - $${elemento.precio}</p>
                <button class="boton-eliminar" onclick='eliminarElemento(${indice})'>Eliminar</button>
            </li>
        `;
    });

    cartaCarrito += "</ul><button onclick='vaciarCarrito()'> Vaciar carrito </button>";
    
    const total = carrito.reduce((acum, fruta) => acum + fruta.precio, 0);

    cartaCarrito += `<p class="total-carrito">Total: $${total}</p>`;
    
    
    
    contenedorCarrito.innerHTML = cartaCarrito;

    
    console.log(carrito); 
    
    guardarCarrito();


}


/**
 Función: agregarACarrito()
 -------------------------------- 
 - Esta funcion al hacer click al boton "Agregar al carrito" buscara el id de la fruta seleccionada y lo agregara al array carrito, ademas que actualizara el carrito en pantalla
*/
function agregarACarrito(id)
{
    let frutaSeleccionada = frutas.find(f => f.id === id);
    carrito.push(frutaSeleccionada);
    console.log(`id del producto ${id}`); 
    mostrarCarrito();
}

/**
 Función: eliminarElemento()
 -------------------------------- 
 - Esta funcion elimina el producto seleccionado del carrito y actualizara el carrito 
*/
function eliminarElemento(indice)
{
    console.log(`fruta borrado del indice: '${indice}'`);
    carrito.splice(indice, 1)

    mostrarCarrito(); 
}

/**
 Función: vaciarCarrito()
 -------------------------------- 
 - Esta funcion vacia todo el carrito y muestra por consola el mensaje de carrito vacio
*/
function vaciarCarrito()
{
    carrito = [];
    contenedorCarrito.innerHTML = "";
    localStorage.clear();
    mostrarCarrito()
    console.log("carrito vacio...")
}

/**
 Función: ordenarCarritoPorNombre()
 --------------------------------
 - Recorre el array carrito comparando los nombres de los productos hasta ordenando alfabeticamente.
 - Al final llama a mostrarCarrito() para actualizar el carrito.
*/
function ordenarCarritoPorNombre() {
    for (let i = 0; i < carrito.length - 1; i++) {
        for (let j = i + 1; j < carrito.length; j++) {
            if (carrito[i].nombre > carrito[j].nombre) {
                let aux = carrito[i];
                carrito[i] = carrito[j];
                carrito[j] = aux;
            }
        }
    }
    mostrarCarrito();
}
/**
 Función: ordenarCarritoPorPrecio()
 --------------------------------
 - Recorre el array `carrito` comparando los precios de los productos y los ordena de menor a mayor.
 - Al final llama a mostrarCarrito() para actualizar el carrito.
*/
function ordenarCarritoPorPrecio() {
    for (let i = 0; i < carrito.length - 1; i++) {
        for (let j = i + 1; j < carrito.length; j++) {
            if (carrito[i].precio > carrito[j].precio) {
                let aux = carrito[i];
                carrito[i] = carrito[j];
                carrito[j] = aux;
            }
        }
    }
    mostrarCarrito();
}





/**
 Función: guardarCarrito()
 -------------------------------- 
 - Esta funcion guarda el contenido actual del carrito en el localStorage del navegador conservando los datos aunque recargues o cierres la página.
 - Convierte el array carrito en formato JSON
 */
function guardarCarrito() {
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

/**
 Función: cargarCarrito()
 -------------------------------- 
 - Verifica la existencia del carrito previo y muestra por consola  
 - Convierte el texto JSON a su array de objetos original y despues llama mostrarCarrito() para actualizar el carrito 
 */
function cargarCarrito() {
    const carritoGuardado = localStorage.getItem("carrito");
    if (carritoGuardado) {
        carrito = JSON.parse(carritoGuardado);
        mostrarCarrito();
        console.log("Existe Carrito");
    } else {
        console.log("No existe carrito");
    }
}



function init()
{
    imprimirDatosAlumno();
    mostrarProductos(frutas);
    cargarCarrito(); 


}


init()
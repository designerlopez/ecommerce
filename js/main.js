const products = [
    {
        id: 1,
        name: 'Hoodies',
        price: 14.00,
        image: './img/featured1.png',
        category: 'hoodies',
        quantity: 10
    },
    {
        id: 2,
        name: 'Shirts',
        price: 24.00,
        image: './img/featured2.png',
        category: 'shirts',
        quantity: 15
    },
    {
        id: 3,
        name: 'Sweatshirts',
        price: 24.00,
        image: './img/featured3.png',
        category: 'sweatshirts',
        quantity: 20
    }
]



/*template

<!-- <div class="card" id="card">
                    <div class="card__container--img">
                        <img src="" alt="" class="product__img">
                    </div>
                    <div class="product__info">
                        <h2 class="product__price">
                            <span class="stock"></span>
                        </h2>
                        <h3 class="product__name">
                        </h3>
                        <button class="product_button">
                            <i class="bx bx-plus"></i>
                        </button>
                    </div>
                </div> -->
        

*/

/* BUSCAR EL ELEMENTO QUE CONTENDRA LOS PRODUCTOS */

const contenedor__productos = document.getElementById('products__container');
const contenedorCartShop = document.querySelector(".cart")
const contenedorCartShopItems = document.querySelector(".cart__container")


function pintarProductos() {

    let html = ``;

    products.forEach(({ id, name, price, image, quantity }) => {

        html += `

        <div class="card" id="card">
                    <div class="card__container--img">
                        <img src="${image}" alt="" class="product__img">
                    </div>
                    <div class="product__info">
                        <h2 class="product__price">$${price}
                            <span class="stock">${quantity}</span>
                        </h2>
                        <h3 class="product__name">${name}
                        </h3>
                        <button class="product__button" id="${id}">
                            <i class="bx bx-plus" id="${id}"></i>
                        </button>
                    </div>
                </div>   
        `

    })


    contenedor__productos.innerHTML = html;

}
/*invoco la funcion */
pintarProductos();

/*PINTAR  carrito*/
let objCartShop = {}
/*delegando evento para que agregue al carrito*/

function pintarCartShop() {
    let html = ""
    const arrayShop = Object.values(objCartShop);

    arrayShop.forEach((element)=>{
        html += `
        <article class="cart__card">
          <div class="cart__box">
            <img src="${element.image}" alt="${element.name}" class="cart__img">
          </div>

          <div class="cart__details">
            <h3 class="cart__title">${element.name}</h3>
            <span class="cart__stock">Stock: ${element.quantity} | <span class="cart__price">${element.price}</span></span>
            <span class="cart__subtotal">
              Subtotal: ${(element.amount * element.price)}
            </span>
  


        </article>`




    })


    
    

    contenedorCartShopItems.innerHTML = html

}


function addCartShop(id){

    const foundProduct = products.find(products => products.id === id);

    
        if (objCartShop[foundProduct.id]===foundProduct) {
            objCartShop[foundProduct.id].amount++;

        } else {
            objCartShop[foundProduct.id] = foundProduct;
            objCartShop[foundProduct.id].amount = 1;
        }
            
        
        pintarCartShop();
        
    console.log(objCartShop)
    }


/*     if (objCartShop[foundProduct]) {
        objCartShop[foundProduct].amount++;

    } else {
        objCartShop[foundProduct] = foundProduct;
        objCartShop[foundProduct].amount = 1;
    }
 */
    /* console.log(foundProduct); */


pintarCartShop();

contenedor__productos.addEventListener("click", (e) => {

    if (e.target.classList.contains("product__button") || e.target.classList.contains("bx-plus")) {
        const productId = Number(e.target.id);

        addCartShop(productId);
        
        
    }

})























/*activar y desactivar menu*/

function navMenu() {
    const navToggle = document.getElementById('nav-toggle')
    const navMenu = document.getElementById('nav-menu')
    const navClose = document.getElementById('nav-close')
    const navLink = document.querySelectorAll('.nav__link')

    if (navToggle) {
        navToggle.addEventListener('click', function () {
            navMenu.classList.toggle('show-menu')
        })
    }

    if (navClose) {
        navClose.addEventListener('click', function () {
            navMenu.classList.remove('show-menu')
        })
    }

    function linkAction() {
        const navMenu = document.getElementById('nav-menu')
        navMenu.classList.remove('show-menu')
    }
    navLink.forEach(n => n.addEventListener('click', linkAction))
}

navMenu();



/*activar dy desactivar carrito */

function cartMenu() {
    const cartToggle = document.getElementById('cart-shop')
    const cart = document.getElementById('cart')
    const cartClose = document.getElementById('cart-close')

    if (cartToggle) {
        cartToggle.addEventListener('click', function () {
            cart.classList.toggle('show-cart')
        })
    }

    if (cartClose) {
        cartClose.addEventListener('click', function () {
            cart.classList.remove('show-cart')
        })
    }
}

cartMenu();



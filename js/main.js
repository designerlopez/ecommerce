let products = [
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
const itemsCount=document.getElementById("items-count")
const itemsCountMain=document.getElementById("cart-count")
const contenedorCartShop = document.querySelector(".cart")
const contenedorCartShopItems = document.querySelector(".cart__container")
const cartTotal=document.querySelector(".cart__prices-total")

let objCartShop = {}


/*calculando total */

function printTotal(){
    const arrayShop=Object.values(objCartShop);

   
    let total=arrayShop.reduce((acum, curr)=>{
        acum+=curr.price*curr.amount;
        return acum;
        
    },0);

    let html=``;

    html+=`
    
    <span>$${total} </span>
    
    `

    console.log(total);
    cartTotal.innerHTML=html

    

}








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
    printTotal()

}




/*invoco la funcion */
pintarProductos();

/*PINTAR  carrito*/

/*delegando evento para que agregue al carrito*/

function pintarCartShop() {
    let html = ""
    const arrayShop = Object.values(objCartShop);



       

    if(arrayShop.length>0){
    arrayShop.forEach(({id, name, price, image, quantity, amount})=>{
        html += `
        <article class="cart__card">
          <div class="cart__box">
            <img src="${image}" alt="${name}" class="cart__img">
          </div>

          <div class="cart__details">
            <h3 class="cart__title">${name}</h3>
            <span class="cart__stock">Stock: ${quantity} | <span class="cart__price">$${price}</span></span>
            <span class="cart__subtotal">
              Subtotal: $ ${(amount * price)}
            </span>

            <div class="cart__amount">
              <div class="cart__amount-content">
                <span class="cart__amount-box minus" id="${id}">
                <i class='bx bx-minus'  id="${id}"></i>
                </span>
  
                <span class="cart__amount-number">${amount} units</span>
  
                <span class="cart__amount-box plus" >
                <i class='bx bx-plus' id="${id}"  ></i>
                </span>
              </div>
  
              <i class='bx bx-trash-alt cart__amount-trash' id="${id}"></i>
            </div>
          </div>        

          </article>`

    })
    }else{
        html += `
      <div class="cart__empty">
        <img src="./img/empty-cart.png" alt="empty cart">
        <h2>Tu carro esta vacio parce</h2>
      </div>`
    }
    contenedorCartShopItems.innerHTML = html
    printTotal();
    countProducts();

}



function addCartShop(id){

    const foundProduct = products.find(products => products.id === id);

    
        if (objCartShop[foundProduct.id]===foundProduct) {
            if(foundProduct.quantity===objCartShop[Number(id)].amount)return alert("no hay mas productos en el stock");

            objCartShop[foundProduct.id].amount++;

        } else {
            objCartShop[foundProduct.id] = foundProduct;
            objCartShop[foundProduct.id].amount = 1;
        }
            
        
        pintarCartShop();
        
        
    console.log(objCartShop)
    }


/*captura y busca el id del elemento desde la pagina principal*/
contenedor__productos.addEventListener("click", (e) => {

    if (e.target.classList.contains("product__button") || e.target.classList.contains("bx-plus")) {
        const productId = Number(e.target.id);

        addCartShop(productId);      
    }

})



/*contar productos */

function countProducts(){
    arrayShop=Object.values(objCartShop);
    console.log(arrayShop);

    let suma= arrayShop.reduce((acum, curr)=>{
        acum+=curr.amount;
        return acum;
    },0)


    itemsCount.textContent=suma;
    itemsCountMain.textContent=suma;

    

}


contenedorCartShopItems.addEventListener("click", (e)=>{
    if(e.target.classList.contains("bxs-check-shield")){

        const op=confirm("Estas seguro de comprar")

        if(op){
            products=products.map(product=>{
                if(objCartShop[product.id]?.id===product.id){
                    return{
                        ...product,
                        quantity: product.quantity-objCartShop[product.id].amount,
                    };
                }else{
                    return product
                }
            });

            objCartShop={};
            pintarCartShop();
            pintarProductos();

        }




    }

});


/*funciones de botones del carrito*/
contenedorCartShopItems.addEventListener("click", (e)=>{
       
   

    if(e.target.classList.contains("bx-minus")){
        const productId=Number(e.target.id);
        const foundProduct = products.find(products => products.id === productId);

        if (objCartShop[foundProduct.id]===foundProduct) {
            if(objCartShop[productId].amount<2)return alert("debes comprar parce");
            objCartShop[productId].amount--;
        }

               
    }

    if(e.target.classList.contains("bx-plus")){
        const productId=Number(e.target.id);
        const foundProduct = products.find(products => products.id === productId);
        
        if (objCartShop[foundProduct.id]===foundProduct) {
            if(foundProduct.quantity===objCartShop[productId].amount)return alert("no hay mas productos en el stock");
            objCartShop[productId].amount++;
        }

        
    }

    if(e.target.classList.contains("bx-trash-alt")){
        const productId=Number(e.target.id);
        delete objCartShop[productId];
    }
    pintarCartShop();
    
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



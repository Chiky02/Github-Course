
//Tomamos el div contenedor de todos
let listProductHTML = document.querySelector('.listProduct');

//tomamos el contenedor del listado de carrito de compras
let listCartHTML = document.querySelector('.listCart');

//tomamos el loguito del carrito
let iconCart = document.querySelector('.icon-cart');

//tomamos el numero de productos en el carrito de 
let iconCartSpan = document.querySelector('.icon-cart span');
//tomamos el cuerpo de la página
let body = document.querySelector('body');
//tomamos el boton de cerrar ventana de carrito de compras
let closeCart = document.querySelector('.close');

//new tomamos el boton de pago 
let a_pagar = document.querySelector('.close');
//inicializamos arras vacios para los productos de la pagina y el carrito
let products = [];
let cart = [];

/*hacemos que cada vez que se le de click
 *al icono de carrito se muestre el menu de compras
*/
iconCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})

/*hacemos que cada vez que se le de click
 *al boton de cerrar carrito se oculte el menu de compras
*/
closeCart.addEventListener('click', () => {
    body.classList.toggle('showCart');
})


//**********Esta funcion crea todas las instancias de cada producto */
    const addDataToHTML = () => {
    // remove datas default from HTML

        // verifica si hay productos en el array de productos
        if(products.length > 0) // if has data
        {
            products.forEach(product => {
                //añade los productos existentes en el array que creamos
                //anteriormente solo si existen
                let newProduct = document.createElement('div');
                newProduct.dataset.id = product.id;
                newProduct.classList.add('item');
                newProduct.innerHTML = 
                `<img src="${product.image}" alt="">
                <h2>${product.name}</h2>
                <div class="price">$${product.price}</div>
                <button class="addCart">Add To Cart</button>`;
                listProductHTML.appendChild(newProduct);
            });
        }
    }

    /******************************************** */
    //si se le da click al contenedor de productos
    listProductHTML.addEventListener('click', (event) => {
        let positionClick = event.target;
        //si dentro de el contenedor se le dio click especificamente a adherir al carrito
        if(positionClick.classList.contains('addCart')){
            let id_product = positionClick.parentElement.dataset.id;
            //se agrega con otra funcion en el localstorage
            //el elemento seleccionado
            addToCart(id_product);
        }
    })

    //funcion para añadir productos al carrito

    //recibimos como parametro el id del producto
const addToCart = (product_id) => {
    //toma el array de productos y lo compara con el id dado como argumentos
    let positionThisProductInCart = cart.findIndex((value) => value.product_id == product_id);
    
    //verifica si el array de productos
    //en carrito esta vacio
    if(cart.length <= 0){
        cart = [{
            product_id: product_id,
            quantity: 1
        }];
    //ahora revisa si el produto no esta en el listado
    //del carrito
    }else if(positionThisProductInCart < 0){
        cart.push({
            product_id: product_id,
            quantity: 1
        });
    }
    //como si hay productos en el carrito y si estan en el menu
    //le suma 1 a la cantidad de poductos dentro del inventario
    else{
        cart[positionThisProductInCart].quantity = cart[positionThisProductInCart].quantity + 1;
    }
    //funciones finales
    addCartToHTML();
    addCartToMemory();
}

//añade ña informacion del carrito al localstorage
const addCartToMemory = () => {
    localStorage.setItem('cart', JSON.stringify(cart));
}

//esta funcion añade productos al carrito de compras
const addCartToHTML = () => {
    listCartHTML.innerHTML = '';
    //variable de total de productos actuales
    let totalQuantity = 0;

    //si hay productos en el carrito
    if(cart.length > 0){
        //para cada producto del carrito
        cart.forEach(item => {
            //hace la suma de los cada producto por unidad para tener el total de todos los productos
            totalQuantity = totalQuantity +  item.quantity;

            //crea en el dom un elemento contenedor
            let newItem = document.createElement('div');
             //crea en el dom los items dentro del contenedor
            newItem.classList.add('item');
            //le asigna como id el id de cada producto al item
            newItem.dataset.id = item.product_id;
                //encuentra en productos la posicion del id igual a los productos del carrito
            let positionProduct = products.findIndex((value) => value.id == item.product_id);
            let info = products[positionProduct];
            //toma la informacion del producto en cuestion
            listCartHTML.appendChild(newItem);
            //en el carrito de compras añade el nuevo item

            //modifica el item creado en el carrito y añade toda la infp
            newItem.innerHTML = `
            <div class="image">
                    <img src="${info.image}">
                </div>
                <div class="name">
                ${info.name}
                </div>
                <div class="totalPrice">$${info.price * item.quantity}</div>
                <div class="quantity">
                    <span class="minus"><</span>
                    <span>${item.quantity}</span>
           
                    <span class="plus">></span>
                </div>
            `;
        })
    }
    //en el icono del carrito añade la cantidad total de productos seleccionados
    iconCartSpan.innerText = totalQuantity;
    //aca debemos colocar el costo total de los productos en el carrito/*/////////////////////////
}

//revisa si se le clickeó a disminuir  o aumentar productos
listCartHTML.addEventListener('click', (event) => {
    let positionClick = event.target;
    if(positionClick.classList.contains('minus') || positionClick.classList.contains('plus')){
        let product_id = positionClick.parentElement.parentElement.dataset.id;
        let type = 'minus';
        if(positionClick.classList.contains('plus')){
            type = 'plus';
        }
        changeQuantityCart(product_id, type);
    }
})

//cambia la cantidad de productos en el carrito
//tal vez podemos añadir un boton que elimine los productos
const changeQuantityCart = (product_id, type) => {
    let positionItemInCart = cart.findIndex((value) => value.product_id == product_id);
    if(positionItemInCart >= 0){
        let info = cart[positionItemInCart];
        switch (type) {
            case 'plus':
                cart[positionItemInCart].quantity = cart[positionItemInCart].quantity + 1;
                break;
        
            default:
                let changeQuantity = cart[positionItemInCart].quantity - 1;
                if (changeQuantity > 0) {
                    cart[positionItemInCart].quantity = changeQuantity;
                }else{
                    //si la cantidad de productos llega a 0, se elimina el producto de la lista
                    cart.splice(positionItemInCart, 1);
                }
                break;
        }
    }
    //actualiza datos en el carrito y en el localstorage
    addCartToHTML();
    addCartToMemory();
}


//esto sucede al iniciar la app
//en pocas palabras, rellenael array de productos y carrito
const initApp = () => {
    // Obtenemos informacion de la base de datos json
    fetch('Celulares.json')
    .then(response => response.json())
    .then(data => {
        products = data;
        addDataToHTML();

        /*guarda la informacion del carrito de compras en
        *el localStorage para que cada vez que el usuario
        *este ahi se muestren sus productos en el carrito
        *la informacion se pone en el carrito al empezar
        */
        if(localStorage.getItem('cart')){
            cart = JSON.parse(localStorage.getItem('cart'));
            addCartToHTML();
        }
    })
}
initApp();

import { menuArray } from './data.js'

const container = document.getElementById('container')
const orderContainer = document.getElementById('order-container')

let cart = []

// Générer le menu
const menuHtml = menuArray.map(item =>`
<div class="item-section">
    <p class="item-img" id="element-${item.id}">${item.emoji}</p>
    <div class="item-info">
        <h2>${item.name}</h2>
        <p class="ingredients">${item.ingredients.join(', ')}</p>
        <p class="price">$${item.price}</p>
    </div>
    <button class="add-btn" data-add="${item.id}">+</button>
</div>`).join('')

container.innerHTML = menuHtml

//Afficher la section de la somme lorsqu'on ajoute un élément du menu
document.addEventListener('click', e => {
    //Si j'appuie sur le bouton ajouter d'un élément
    if(e.target.dataset.add){
        orderContainer.style.display = 'block'
        addToCart()
    }
})

function addToCart(item){
    
}

//   <div class="complete-order-section">
//         <h3>Your order</h3>
//         <div class="order-items" id="order-items">

//             <div class="item">
//                 <p class="name-item" id="NAME TARGET">NAME</p>
//                 <button class="remove-btn" data-remove="NAME TARGET">remove</button>
//             </div>
//             <p class="price">$PRICE</p>

//         </div>
//         <div class="total-container">
//             <p class="total-el">Total price: </p>

//             <p class="price" id="total-el">$TOTAL PRICE</p>

//         </div>
//         <button class="complete-order-btn" id="complete-order-btn">Complete order</button>
//     </div>
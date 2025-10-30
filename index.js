import { menuArray } from './data.js'

const container = document.getElementById('container')
const orderContainer = document.getElementById('order-container')
const orderItems = document.getElementById('order-items')
const totalEl = document.getElementById('total-el')

let cart = []

//Génération du menu
function renderMenu() {
    container.innerHTML = menuArray.map(item => `
        <div class="item-section">
            <p class="item-img">${item.emoji}</p>
            <div class="item-info">
                <h2>${item.name}</h2>
                <p class="ingredients">${item.ingredients.join(', ')}</p>
                <p class="price">$${item.price}</p>
            </div>
            <button class="add-btn" data-add="${item.id}">+</button>
        </div>
    `).join('')
}

//Ajouter un item au panier
function addToCart(itemId) {
    const item = menuArray.find(i => i.id == itemId)
    cart.push(item)
    renderCart()
}

//Supprimer un item du panier 
function removeFromCart(index) {
    cart.splice(index, 1)
    renderCart()
}

//Calcul du total
function getTotal() {
    const total = cart.reduce((sum, item) => sum + item.price, 0)

    const hasBeer = cart.some(item => item.name.toLowerCase() === "beer")
    const hasPizza = cart.some(item => item.name.toLowerCase() === "pizza")
    const hasHamburger = cart.some(item => item.name.toLowerCase() === "hamburger")

    // Si Beer + Pizza ou Beer + Hamburger => 10% de réduction
    const discount = (hasBeer && (hasPizza || hasHamburger)) ? total * 0.1 : 0

    return { total, discount, final: total - discount }
}

//Affichage du panier
function renderCart() {
    if (cart.length === 0) {
        orderContainer.style.display = 'none'
        return
    }

    orderContainer.style.display = 'block'

    const { total, discount, final } = getTotal()

    orderItems.innerHTML = cart.map((item, index) => `
        <div class="order-items">
            <p class="name-item">${item.name}</p>
            <button class="remove-btn" data-remove="${index}">remove</button>
            <p class="price">$${item.price}</p>
        </div>
    `).join('')

    // Affichage du total et de la réduction s’il y en a une
    const discountHtml = discount > 0
        ? `<p class="discount-msg">Discount applied: -$${discount.toFixed(2)}</p>`
        : ''

    totalEl.innerHTML = `
        ${discountHtml}
        <strong>$${final.toFixed(2)}</strong>
    `
}

//Pop-up de paiement
function showPaymentForm() {
    const paymentModal = document.createElement('div')
    paymentModal.classList.add('payment-modal')
    paymentModal.innerHTML = `
        <div class="payment-content">
            <h2>Enter card details</h2>
            <form id="payment-form">
                <input type="text" id="name" placeholder="Enter your name" required>
                <input type="text" id="card-number" placeholder="Enter card number" required>
                <input type="text" id="cvv" placeholder="Enter CVV" required>
                <button type="submit" id="pay-btn">Pay</button>
            </form>
        </div>
    `
    document.body.appendChild(paymentModal)

    // Ferme la fenêtre si on clique à l’extérieur du contenu
    paymentModal.addEventListener('click', (e) => {
        if (e.target === paymentModal) {
            paymentModal.remove()
        }
    })

    // Gestion du paiement
    const form = document.getElementById('payment-form')
    form.addEventListener('submit', function(e) {
        e.preventDefault()
        const name = document.getElementById('name').value.trim()
        if (name) {
            paymentModal.remove()
            showThankYou(name)
        }
    })
}

//Message de remerciement
function showThankYou(name) {
    orderContainer.innerHTML = `
        <div class="thank-you">
            <h2>Thanks, ${name}! Your order is on its way! 🍔</h2>
            <p>Please rate your experience:</p>
            <div class="rating" id="rating-stars">
                ${[1,2,3,4,5].map(n => `<span class="star" data-star="${n}">★</span>`).join('')}
            </div>
            <p id="rating-msg"></p>
        </div>
    `

    const stars = document.querySelectorAll('.star')
    const msg = document.getElementById('rating-msg')

    stars.forEach(star => {
        star.addEventListener('click', () => {
            const rating = parseInt(star.dataset.star)
            stars.forEach(s => s.classList.toggle('active', parseInt(s.dataset.star) <= rating))
            msg.textContent = `You rated this app ${rating} star${rating > 1 ? 's' : ''}! ⭐`
        })
    })
}


//Écoute des clics
document.addEventListener('click', e => {
    if (e.target.dataset.add) {
        addToCart(e.target.dataset.add)
    } else if (e.target.dataset.remove) {
        removeFromCart(e.target.dataset.remove)
    } else if (e.target.id === 'complete-order-btn') {
        showPaymentForm()
    }
})

renderMenu()
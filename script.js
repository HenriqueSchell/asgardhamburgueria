const menu = document.getElementById('menu')
const cartBtn = document.getElementById('cart-btn')
const cartModal = document.getElementById('cart-modal')
const cartItemsContainer = document.getElementById('cart-items')
const cartTotal = document.getElementById('cart-total')
const checkoutBtn = document.getElementById('checkout-btn')
const closeModalBtn = document.getElementById('close-modal-btn')
const cartCounter = document.getElementById('cart-count')
const addressInput = document.getElementById('address')
const addressWarn = document.getElementById('address-warn')

let cart = []


// Abrir o modal do carrinho
cartBtn.addEventListener('click', function(){
    updateCartModal()
    cartModal.style.display = 'flex'
})

// Fechar o modal quando clicar fora
cartModal.addEventListener('click', function(event){
    if(event.target === cartModal){
        cartModal.style.display = 'none'
    }
})

//Fechar o modal quando apertar o botão fechar
closeModalBtn.addEventListener('click', function(){
    cartModal.style.display = 'none'
})


//Pegar o item pelo botão carrinho
menu.addEventListener('click', function(event){
    let parentButton = event.target.closest('.add-to-cart-btn')
    if(parentButton){
        const name = parentButton.getAttribute('data-name')
        const price = parseFloat(parentButton.getAttribute('data-price'))

        //Adicionar ao carrinho
        addToCart(name, price)
    }
})



//Função para adicionar ao carrinho
function addToCart(name, price){

    const existingItem = cart.find(item => item.name == name)

    if(existingItem){
        //se o item exites aumenta + 1
        existingItem.quantity += 1;
    }else{
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }
    updateCartModal()
}


//Atualiza carrinho

function updateCartModal(){
    cartItemsContainer.innerHTML = ''
    let total = 0

    cart.forEach(item => {
        const cartItemElement = document.createElement('div')
        cartItemElement.classList.add('flex', 'justify-between', 'mb-4', 'flex-col')


        cartItemElement.innerHTML = ` 
        <div class="flex items-center justify-between mb-10 ">
            <div>
                <p class="font-bold">${item.name}</p>
                <p>Quantidade: ${item.quantity}</p>
                <p class="font-bold mt-2">Valor: R$${item.price.toFixed(2)}</p>
            </div>

                <button class="hover:scale-110 duration-500 remove-btn" data-name="${item.name}">Remover</button>
            
        </div>`

        total += item.price * item.quantity

        cartItemsContainer.appendChild(cartItemElement)
    })

    cartTotal.textContent = total.toLocaleString('pt-br', {style: 'currency', currency: 'BRL' })

    cartCounter.innerText = cart.length
}

//Função para remover item do carrinho
cartItemsContainer.addEventListener('click', function(event){
    if(event.target.classList.contains('remove-btn')){
        const name = event.target.getAttribute('data-name')
        
        removeItemCart(name)
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name)
    if(index !== -1){
        const item = cart[index]
        if(item.quantity > 1){
            item.quantity -= 1
            updateCartModal()
            return
        }

        cart.splice(index, 1)
        updateCartModal()
    }
}

addressInput.addEventListener('input', function(event){
    let inputValue = event.target.value 

    if(inputValue !== ''){
        addressWarn.classList.add('hidden')
    }

})

checkoutBtn.addEventListener('click', function(){

    const isOpen = checkRestaurantOpen()
    if(!isOpen){
        Toastify({
            text: "Ops o restaurante está fechado",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "left", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
                background: "#ef4444",
            },
            onClick: function(){} // Callback after click
            }).showToast();
    }

    if(cart.length === 0) return
    if(addressInput.value === ''){
        addressWarn.classList.remove('hidden')
        addressInput.classList.add('border-red-500')
        return
    }
    
    
    const cartItems = cart.map((item) => {
        return(
            `${item.name} Quantidade: ${item.quantity} Preço: R$${item.price} | `
        )
    }).join('')

    const message = encodeURIComponent(cartItems)
    const phone = '+555180491184'

    window.open(`https://wa.me/${phone}?text=${message} Endereço: ${addressInput.value}`, '_blank')

    cart = []
    updateCartModal()
})



function checkRestaurantOpen(){
    const data = new Date()
    const hora = data.getHours()
   //const hora = 4
    return hora >= 18 && hora < 22 //Restaurante aberto
}

const spanItem = document.getElementById('date-span')
const isOpen = checkRestaurantOpen()

if(isOpen){
    spanItem.classList.remove('bg-red-600')
    spanItem.classList.add('bg-green-600')
    
}else{
     spanItem.classList.remove('bg-green-600')
     spanItem.classList.add('bg-red-600')
}
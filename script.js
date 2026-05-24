/* ============================= */
/* NAVBAR TOGGLE */
/* ============================= */
function myFunction(){
    const nav = document.getElementById("myTopnav");
    if(nav){
        nav.classList.toggle("responsive");
    }
}

/* ============================= */
/* ADD CART BUTTONS */
/* ============================= */

let cartButtons = document.querySelectorAll(".addcart");

cartButtons.forEach(button => {

    button.addEventListener("click", function(){

        let product = this.closest(".gallery") || this.closest(".flex-container");

        if(!product) return;

        let nameEl = product.querySelector(".name");
        let priceEl = product.querySelector(".price");
        let imgEl = product.querySelector("img");

        let name = nameEl ? nameEl.innerText : "Product";
        let price = priceEl ? parseFloat(priceEl.innerText.replace("$","")) : 0;
        let img = imgEl ? imgEl.src : "";

        let cart = JSON.parse(localStorage.getItem("cart")) || [];

        let existing = cart.find(item => item.name === name);

        if(existing){
            existing.qty++;
        } else {

            cart.push({
                name:name,
                price:price,
                img:img,
                qty:1
            });

        }

        localStorage.setItem("cart", JSON.stringify(cart));

        alert("Product added to cart!");

        window.location.href = "add_cart.html";

    });

});


/* ============================= */
/* CART PAGE */
/* ============================= */

let cart = JSON.parse(localStorage.getItem("cart")) || [];

function displayCart(){

    const container = document.getElementById("cartItems");

    if(!container) return;

    container.innerHTML = "";

    let subtotal = 0;

    if(cart.length === 0){

        container.innerHTML = "<p>Your cart is empty.</p>";

        updateSummary(0);

        return;
    }

    cart.forEach((item,index)=>{

        subtotal += item.price * item.qty;

        container.innerHTML += `

        <div class="cart-item">

            <img src="${item.img}" width="80">

            <div class="cart-details">

                <h4>${item.name}</h4>

                <p class="price">$${item.price.toFixed(2)}</p>

                <div class="bottom-row">

                    <div class="cart-qty">

                        <button onclick="decrease(${index})">-</button>

                        <span>${item.qty}</span>

                        <button onclick="increase(${index})">+</button>

                    </div>

                    <button class="remove-btn" onclick="removeItem(${index})">

                        <i class="fa-solid fa-trash"></i>

                    </button>

                </div>

            </div>

            <div class="item-total">

                $${(item.price * item.qty).toFixed(2)}

            </div>

        </div>

        `;

    });

    updateSummary(subtotal);

}


/* ============================= */
/* UPDATE SUMMARY */
/* ============================= */

function updateSummary(subtotal){

    let shipping = 5.99;
    let total = subtotal + shipping;

    let subtotalEl = document.getElementById("subtotal");
    let shippingEl = document.getElementById("shipping");
    let totalEl = document.getElementById("total");

    if(subtotalEl){
        subtotalEl.innerText = "$" + subtotal.toFixed(2);
    }

    if(shippingEl){
        shippingEl.innerText = "$" + shipping.toFixed(2);
    }

    if(totalEl){
        totalEl.innerText = "$" + total.toFixed(2);
    }

    localStorage.setItem("cart", JSON.stringify(cart));

}


/* ============================= */
/* CART FUNCTIONS */
/* ============================= */

function increase(i){

    cart[i].qty++;

    displayCart();

}

function decrease(i){

    if(cart[i].qty > 1){

        cart[i].qty--;

    }

    displayCart();

}

function removeItem(i){

    cart.splice(i,1);

    displayCart();

}


/* ============================= */
/* CHECKOUT */
/* ============================= */

const checkoutBtn = document.querySelector(".checkout-btn");

if(checkoutBtn){

    checkoutBtn.addEventListener("click", ()=>{

        window.location.href = "payment.html";

    });

}


/* ============================= */
/* SIDEBAR */
/* ============================= */

const sidebarWrapper = document.querySelector('.sidebar-wrapper');
const sidebar = document.getElementById("sidebar");
const footer = document.getElementById("footer");

if(sidebarWrapper && sidebar && footer){

    window.addEventListener("scroll", () => {

        const headerHeight = 70;
        const sidebarHeight = sidebar.offsetHeight;
        const scrollY = window.scrollY;

        const sidebarTop = sidebarWrapper.offsetTop;
        const footerTop = footer.offsetTop;

        if(scrollY + headerHeight > sidebarTop){

            if(scrollY + sidebarHeight + headerHeight < footerTop){

                sidebar.classList.add("sidebar-fixed");
                sidebar.classList.remove("sidebar-bottom");

            } else {

                sidebar.classList.remove("sidebar-fixed");
                sidebar.classList.add("sidebar-bottom");

            }

        } else {

            sidebar.classList.remove("sidebar-fixed");
            sidebar.classList.remove("sidebar-bottom");

        }

    });

}


/* ============================= */
/* DROPDOWN */
/* ============================= */

function toggleDropdown(){

    let dropdown = document.getElementById("myDropdown");

    if(dropdown){

        dropdown.classList.toggle("show");

    }

}

window.onclick = function(event){

    if(!event.target.matches('.dropbtn')){

        let dropdowns = document.getElementsByClassName("dropdown-content");

        for(let i = 0; i < dropdowns.length; i++){

            dropdowns[i].classList.remove('show');

        }

    }

}


/* ============================= */
/* SORT PRODUCTS */
/* ============================= */

function sortByName(){

    let container = document.getElementById("products");

    if(!container) return;

    let items = Array.from(container.getElementsByClassName("gallery"));

    items.sort((a,b)=>{

        return a.dataset.name.localeCompare(b.dataset.name);

    });

    items.forEach(item => container.appendChild(item));

}

function sortLowHigh(){

    let container = document.getElementById("products");

    if(!container) return;

    let items = Array.from(container.getElementsByClassName("gallery"));

    items.sort((a,b)=>{

        return a.dataset.price - b.dataset.price;

    });

    items.forEach(item => container.appendChild(item));

}

function sortHighLow(){

    let container = document.getElementById("products");

    if(!container) return;

    let items = Array.from(container.getElementsByClassName("gallery"));

    items.sort((a,b)=>{

        return b.dataset.price - a.dataset.price;

    });

    items.forEach(item => container.appendChild(item));

}


/* ============================= */
/* FILTER PRODUCTS */
/* ============================= */

function filterProducts(){

    const categoryInput = document.querySelector('input[name="category"]:checked');
    const priceInput = document.querySelector('input[name="price"]:checked');

    if(!categoryInput || !priceInput) return;

    const category = categoryInput.value;
    const price = priceInput.value;

    const products = document.querySelectorAll('.gallery');

    products.forEach(p => {

        const pCategory = p.dataset.category;
        const pPrice = parseFloat(p.dataset.price);

        let categoryMatch = (category === "all") || (category === pCategory);

        let priceMatch = false;

        if(price === "all") priceMatch = true;
        else if(price === "10") priceMatch = pPrice < 10;
        else if(price === "20") priceMatch = pPrice >= 10 && pPrice <= 20;
        else if(price === "40") priceMatch = pPrice > 20 && pPrice <= 40;
        else if(price === "over40") priceMatch = pPrice > 40;

        if(categoryMatch && priceMatch){

            p.style.display = "";

        } else {

            p.style.display = "none";

        }

    });

}

document.querySelectorAll('input[name="category"]').forEach(r => {

    r.addEventListener("change", filterProducts);

});

document.querySelectorAll('input[name="price"]').forEach(r => {

    r.addEventListener("change", filterProducts);

});


/* ============================= */
/* SEARCH */
/* ============================= */

const searchInput = document.getElementById("mySearch");

if(searchInput){

    searchInput.addEventListener("input", function(){

        const query = this.value.toLowerCase();

        const products = document.querySelectorAll(".gallery");

        products.forEach(product => {

            const name = product.dataset.name.toLowerCase();
            const category = product.dataset.category.toLowerCase();

            if(name.includes(query) || category.includes(query)){

                product.style.display = "";

            } else {

                product.style.display = "none";

            }

        });

    });

}


/* ============================= */
/* PRODUCT PAGE */
/* ============================= */

function goBack(){

    window.history.back();

}


/* ============================= */
/* QUANTITY */
/* ============================= */

document.querySelectorAll(".cart-box").forEach(box => {

    let count = 0;

    const plus = box.querySelector(".plus");
    const minus = box.querySelector(".minus");
    const quantity = box.querySelector(".quantity");

    if(!plus || !minus || !quantity) return;

    plus.addEventListener("click", ()=>{

        count++;

        quantity.textContent = count;

    });

    minus.addEventListener("click", ()=>{

        if(count > 0){

            count--;

            quantity.textContent = count;

        }

    });

});


/* ============================= */
/* START CART */
/* ============================= */

displayCart();
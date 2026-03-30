$(document).ready(function(){
  $(function () {
    $(document).scroll(function () {
        $navv = $(".nav")
        $navv.toggleClass('scrolled', $(this).scrollTop() > $navv.height())
      })
  })

  let navigation=document.getElementById('navbar')
document.getElementById('hamburger').addEventListener('click',()=>{
    navigation.classList.toggle('show')    
})
let x=document.getElementById('hamburger')
document.getElementById("hamburger").addEventListener("click", function () {
  x.classList.toggle("hamclicked")
})
})
$(document)
  .ready(function () {
    $("#cart-container").hide()
    $("#checkout").hide()
    let products = []
    fetch("products.json")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json()
      })
      .then((data) => {
        products = data;
        displayProducts(products)
      })
      .catch((error) => {
        console.error("Error:", error)
      });
      function addItemToStore(id) {
        let cartItems = JSON.parse(localStorage.getItem("cartItems"))
  
        if (!cartItems) {
          cartItems = {
            [id]: 1,
          }
        } else {
          if (id in cartItems) {
            cartItems[id] += 1
          } else {
            cartItems[id] = 1
          }
        }
  
        localStorage.setItem("cartItems", JSON.stringify(cartItems))
      }
      function displayProducts(filteredProducts) {
        $("#products-container").empty()
        if (filteredProducts.length === 0) {
        } else {
          filteredProducts.forEach((product) => {
            const productCard = `<div class="product-card">
                        <div class="card-img-container">
                            <img src="${product.image}" alt="${product.name}">
                            <h3>${product.name}</h3>
                        </div>
                        <div class="card-overlay">
                            <h3>${product.name}</h3>
                            <p class="price">Price: $${product.price}</p>
                            <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                        </div>
                    </div>`
            $("#products-container").append(productCard)
          })
        }
      }
      $("#search").on("input", function () {
        let query = $(this).val().toLowerCase()
        let filteredProducts = products.filter((product) =>
          product.name.toLowerCase().includes(query)
        )
        displayProducts(filteredProducts)
      })
      $(".filtercat .filter-btn").on("click", function () {
        let selectedCategory = $(this).data("category")
        let selectedType =
          $(".filtertype .filter-btn.selected").data("type") || "all"
        $(".filtercat .filter-btn").removeClass("selected")
        $(this).addClass("selected")
        filterProducts(selectedCategory, selectedType)
      })
      $(".filtertype .filter-btn").on("click", function () {
        let selectedType = $(this).data("type")
        let selectedCategory =
          $(".filtercat .filter-btn.selected").data("category") || "all"
        $(".filtertype .filter-btn").removeClass("selected")
        $(this).addClass("selected")
        filterProducts(selectedCategory, selectedType)
      })
      function filterProducts(category, type){
        let filteredProducts = products
        if (category !== "all"){
          filteredProducts = filteredProducts.filter(
            (product) => product.category === category
          )
        }
        if (type !== "all"){
          filteredProducts = filteredProducts.filter(
            (product) => product.type === type
          )
        }
        displayProducts(filteredProducts)
      }
  
      $(document).on("click", ".add-to-cart", function () {
        let productId = $(this).data("id")
  
        addItemToStore(productId)
  
        let product = products.find((p) => p.id === productId)
  
        if (product) {
          let cartItem = cart.find((item) => item.id === productId)
          if (cartItem) {
            cartItem.quantity += 1
          } else {
            cart.push({ ...product, quantity: 1 })
          }
          updateCartDisplay()
        }
      })
  
      let cart = []
      function addToCart(product) {
        cart.push(product)
        updateCartDisplay()
      }
      $("#cartisempty").html("<h3>Your cart is empty!</h3>")
      function updateCartDisplay() {
        $("#cart-container").empty()
        $("#cartisempty").show()
        $("#cartisempty").html("<h3>Your cart is empty!</h3>")
        $("#yourItems").hide()
        $("#checkout").hide()
        if (cart.length === 0) {
          $("#cartisempty").css({
            color: "white",
            "align-items": "center",
          })
          $("#cart-container").hide()
        } else {
          $("#checkout").show()
          $("#yourItems").show()
          $("#cartisempty").hide()
          $("#yourItems").html("<h3>Your Items</h3>")
          $("#yourItems").css({
            color: "white",
          })
          $("#cart-container").show()
          cart.forEach((product) => {
            $("#cart-container").append(`
            <div>
            <div class="cart-item">
              <img src="${product.image}" alt="${product.name}">
              <h4>${product.name}</h4>
              <div class="quantity-control">
                              <button class="decrease-qty" data-id="${
                                product.id
                              }">-</button>
                              <span class="quantity">${product.quantity}</span>
                              <button class="increase-qty" data-id="${
                                product.id
                              }">+</button>
                          </div>
                          <p class="price">$${
                            product.price * product.quantity
                          }</p>
                          <button class="remove-item" data-id="${
                            product.id
                          }"><span class="material-icons">delete</span></button>
            </div>
          `)
          })
        }
      }
      $(document).on("click", ".increase-qty", function () {
        let productId = $(this).data("id")
        let cartItem = cart.find((item) => item.id === productId)
        if (cartItem) {
          cartItem.quantity += 1
          updateCartDisplay()
        }
      });
      $(document).on("click", ".decrease-qty", function () {
        let productId = $(this).data("id");
        let cartItem = cart.find((item) => item.id === productId)
  
        if (cartItem) {
          cartItem.quantity -= 1
          if (cartItem.quantity <= 0) {
            cart = cart.filter((item) => item.id !== productId)
          }
          updateCartDisplay()
        }
      })
      $(document).on("click", ".remove-item", function () {
        let productId = $(this).data("id")
        cart = cart.filter((item) => item.id !== productId)
        updateCartDisplay();
      })
  
      $("#cartbtn").click(function () {
        $(".thecart").fadeIn()
        $(".thecart").css({
          display: "flex",
          "justify-content": "center",
          "align-items": "center",
          "text-align": "center",
        })
      })
      $(".closeCart").on("click", function () {
        $(".thecart").fadeOut()
      })
      $(window).click(function (e) {
        if ($(e.target).is(".thecart")) {
          $(".thecart").fadeOut()
        }
      })
      $("#checkoutbtn").on("click", function(){
        alert("Proceeding to checkout...")
      })
    })
    .catch((error) => {
      console.error("Error fetching products:", error)
    })
  
    
  
  

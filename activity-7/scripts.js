console.log("\n---Activity 7: Product Catalog Application---");

console.log("\n---Product Data Structure---");


const products = [
    {
        id: 1,
        name: "Wireless Bluetooth Headphones",
        description: "High-quality noise-cancelling wireless headphones with 30-hour battery life.",
        price: 199.99,
        category: "electronics",
        image: "https://picsum.photos/seed/headphones/300/200"
    },
    {
        id: 2,
        name: "Organic Cotton T-Shirt",
        description: "Comfortable 100% organic cotton t-shirt available in multiple colors.",
        price: 29.99,
        category: "clothing",
        image: "https://picsum.photos/seed/tshirt/300/200"
    },
    {
        id: 3,
        name: "JavaScript Programming Guide",
        description: "Comprehensive guide to modern JavaScript programming techniques and best practices.",
        price: 45.00,
        category: "books",
        image: "https://picsum.photos/seed/jsbook/300/200"
    },
    {
        id: 4,
        name: "Smart Home Security Camera",
        description: "WiFi-enabled security camera with night vision and mobile app integration.",
        price: 129.99,
        category: "electronics",
        image: "https://picsum.photos/seed/camera/300/200"
    },
    {
        id: 5,
        name: "Running Shoes",
        description: "Lightweight running shoes with advanced cushioning technology.",
        price: 89.99,
        category: "clothing",
        image: "https://picsum.photos/seed/shoes/300/200"
    }
];

const filterSelect = document.querySelector("#categoryFilter");
const grid = document.querySelector(".product-grid");
const searchBox = document.querySelector("#searchInput");
const clearButton = document.querySelector("#clearFiltersBtn");




function createProductCard(product){
    const newCard = document.createElement("div");
    newCard.classList.add("product-card");
    newCard.setAttribute("product-id", product.id);
    grid.appendChild(newCard);


     newCard.innerHTML = `<img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">$${product.price.toFixed(2)}</div>
            <span class="product-category">${product.category}</span>
        </div>`
    ;
    return newCard;
}

function displayCards(selectedProducts){
    const productCount = selectedProducts.length;
    const productCountDisplay = document.querySelector("#resultsCount"); 
    grid.innerHTML = "";

    selectedProducts.forEach(product =>{
        grid.appendChild(createProductCard(product));
    });

    if(productCount != products.length){
        productCountDisplay.textContent = "Showing " + productCount + " product(s)";
    }else{
        productCountDisplay.textContent = "Showing All Products"
    }
}

displayCards(products);

function searchProducts(products){
    const searchedString = searchBox.value.toLowerCase();
    const filteredArray = products.filter(product => product.name.toLowerCase().includes(searchedString) || product.description.toLowerCase().includes(searchedString));

    return filteredArray;
}


searchBox.addEventListener("keydown", (e) =>{
    if(e.key === "Enter"){
        displayCards(searchProducts(products));
    }
});



function filterProducts(products){
    const selectedFilter = filterSelect.value; 
    if(selectedFilter === "all"){
        return products;
    }else{
        const filteredArray = products.filter(product => product.category === selectedFilter);
        return filteredArray;
    }
}

filterSelect.addEventListener("change", () =>{
    displayCards(filterProducts(products));
});


clearButton.addEventListener("click", () =>{
    searchBox.value = "";
    displayCards(products);
});

const getQuoteButton = document.querySelector("#getQuoteBtn");
const loadingDiv = document.querySelector("#loadingIndicator");
const errorDiv = document.querySelector("#errorDisplay");
const container = document.querySelector("#quoteContainer");
const instructions = document.querySelector(".instruction-text");
const retryButton = document.querySelector("#retryBtn");
const errorText = document.querySelector("#errorMessage");

async function fetchQuote(){
//Fetching and parsing quotes
    try{
        hideError();
        showLoading(true);
        const quoteData = await fetch("https://dummyjson.com/quotes/random");

        if(!quoteData.ok){
            throw new Error(`HTTP error! status: ${quoteData.status}`);
        }

        const data = await quoteData.json();
        const quote = {
            text: data.quote,
            author: data.author
        }
        return quote;
    }
    catch(error){
        showError(error);
        console.log(error);
    }
    finally{
        showLoading(false);
    }
}

function getNewQuote(quote){
    try{
        container.innerHTML = ""; //resetting the quote container 
        instructions.classList.add("hidden");
        const quoteCard = document.createElement("div");
        const quoteText = document.createElement("p");
        quoteCard.classList.add("quote-card"); //no . operator for classList!!!!
        quoteText.classList.add("quote-text");
        container.appendChild(quoteCard);
        quoteCard.appendChild(quoteText);

        quoteText.innerHTML = quote.text + " -" + quote.author;
    }
    catch(error){
        console.log(error);
    }
}



function showError(message){
    errorDiv.classList.remove("hidden");
    errorText.innerHTML = message;
}

function hideError(){
    errorDiv.classList.add("hidden");
}


function showLoading(loading){
    if(loading){
        loadingDiv.classList.remove("hidden");
        getQuoteButton.disabled = true;
    }else{
        loadingDiv.classList.add("hidden");
        getQuoteButton.disabled = false;
    }
}

function initializeApp(){
    getQuoteButton.addEventListener("click", async ()=>{
    
    const fetchQ = await fetchQuote();
    if(fetchQ){
        getNewQuote(fetchQ); 
    }
});

    retryButton.addEventListener("click",async ()=>{
    hideError();
    const fetchQ = await fetchQuote();
    if(fetchQ){
        getNewQuote(fetchQ); 
    }
});
}

initializeApp();


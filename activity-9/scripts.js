const nameField = document.querySelector("#name");
const emailField = document.querySelector("#email");
const messageField = document.querySelector("#message");
const sucessDiv = document.querySelector("#formSuccess");
const submitButton = document.querySelector("#submitBtn");
const nameError = document.querySelector("#nameError");
const emailError = document.querySelector("#emailError");
const messageError = document.querySelector("#messageError");

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const messagePattern = /^.{10,}$/;

const validationState = {
  name: false,
  email: false,
  message: false,
};

function validateName(nameField){
    if(nameField.value.trim()){
        validationState.name = true;
    }else{
        validationState.name = false;
    }

    return validationState.name;
}


function validateEmail(emailField){
    if(emailField.value.trim()){
        let result = emailPattern.test(emailField.value.trim());
        validationState.email = result;
    }else{
        validationState.email = false;
    }
    return validationState.email;
}

function validateMessage(messageField){
    if(messageField.value.trim()){
        let result = messagePattern.test(messageField.value.trim());
        validationState.message = result;
    }else{
        validationState.message = false;
    }
    return validationState.message;
}

function returnValidState(){ //made this to simplify the change button thing and the event listener
    if(validationState.name === true && validationState.email === true && validationState.message === true){
        return true;
    }else{
        return false;
    }
}

function changeButton(){
    if(returnValidState()){
        submitButton.removeAttribute("disabled"); //remember to check if disabled is class or html attribute
    }else{
        submitButton.setAttribute("disabled", "disabled");
    }
}

function clearForm(){
        nameField.value = "";
        emailField.value = "";
        messageField.value = "";
    }

function initializeApp(){
    console.log("initializing...")
    nameField.addEventListener("input", () =>{
        let valid = validateName(nameField);
        if(valid === false){
            nameError.classList.add("show");
            nameError.textContent = "Error- Please enter your full name!"
        }else{
            nameError.classList.remove("show");
        }
        changeButton();
    });

    emailField.addEventListener("input", () =>{
        let valid = validateEmail(emailField);
        if(valid === false){
            emailError.classList.add("show"); //remember to check if div is hidden
            emailError.textContent = "Error- Please enter a valid email address!"
        }else{
            emailError.classList.remove("show");

        }
        changeButton();
    });

    messageField.addEventListener("input", () =>{
        let valid = validateMessage(messageField);
        if(valid === false){
            messageError.classList.add("show");
            messageError.textContent = "Error- Message must be at least 10 characters!"
        }else{
            messageError.classList.remove("show");
        }
        changeButton();
    });

    submitButton.addEventListener("click", (e) =>{ //dont forget to pass event object if need to do something with it
        if(returnValidState()){
            e.preventDefault();
            sucessDiv.classList.remove("hidden");
            console.log("---Form data---");
            console.log("Name: " + nameField.value);
            console.log("Email: " + emailField.value);
            console.log("Message: " + messageField.value);

            clearForm();
        }
    });

    console.log("Event listeners initialized");

    
}

initializeApp();
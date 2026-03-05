console.log("---Activity 5: Simple Math Operations Widget---");

console.log("\n---ELEMENT SELECTION AND SETUP---");

const numberOne = document.getElementById("number1");
const numberTwo = document.getElementById("number2");
const operationButtons = document.querySelectorAll(".operation");
const clearButton = document.getElementById("clear");
const resultDiv = document.getElementById("result");

console.log("Number1 input: ", numberOne);
console.log("Number2 input: ", numberTwo);
console.log("Operation buttons: ", operationButtons);
console.log("Result div: ", resultDiv);

function logEventDetails(event) {
  console.log("Event Details: ");
  console.log("Type:", event.type);
  console.log("Target:", event.target);
  console.log("Target tagName:", event.target.tagName);
  console.log("Target textContent:", event.target.textContent);
  console.log("CurrentTarget:", event.currentTarget);
}

function addNumbers(num1, num2){
    result = num1 + num2;
    console.log("Addition: " + num1 + " + " + num2 + " = " + result);
    return result;
}

function subtractNumbers(num1, num2){
    result = num1 - num2;
    console.log("Subtraction: " + num1 + " - " + num2 + " = " + result);
    return result;
}

function multiplyNumbers(num1, num2){
    result = num1 * num2;
    console.log("Multiplication: " + num1 + " * " + num2 + " = " + result);
    return result;
}

function divideNumbers(num1, num2){
    if(num2 === 0){
        console.error("Division by 0 attempted");
        return "Error- Cannot divide by 0";
    }
    result = num1 / num2;
    console.log("Division: " + num1 + " / " + num2 + " = " + result);
    return result;
}

function validateInputs(){
    const num1 = parseFloat(numberOne.value);
    const num2 = parseFloat(numberTwo.value);

    console.log(`Validating inputs: "${numberOne.value}" and "${numberTwo.value}"`);

    if(isNaN(num1) || numberOne.value.trim() === ""){
        showError("Please enter a valid number");
        return null;
    }

    if(isNaN(num2) || numberTwo.value.trim() === ""){
        showError("Please enter a valid number");
        return null;
    }

    console.log(`Validation successful: ${num1} and ${num2}`);
    return {num1, num2};
}

function showResult(result, operation) {
  resultDiv.textContent = "Result: " + result;
  resultDiv.className = "result success";
  console.log("Displaying result: " + result + " for operation: " + operation);
}

function showError(message) {
  resultDiv.textContent = message;
  resultDiv.className = "result error";
  console.error("Displaying error: " + message);
}

function clearAll(){
    numberOne.value = "";
    numberTwo.value = "";
    resultDiv.textContent = "Result will appear here";
    resultDiv.className = "result";
    console.log("All inputs and results cleared");
}

function handleOperationClick(event){
    console.log("---OPERATION BUTTON CLICKED---");
    logEventDetails(event);

    const operation = event.target.dataset.operation;
    console.log("Operation selected: " + operation);

    const inputs = validateInputs();
    if(!inputs){
        return;
    }

    const {num1, num2} = inputs;
    let result;

    switch (operation) {
    case "add":
      result = addNumbers(num1, num2);
      showResult(result, "addition");
      break;
    case "subtract":
      result = subtractNumbers(num1, num2);
      showResult(result, "subtraction");
      break;
    case "multiply":
      result = multiplyNumbers(num1, num2);
      showResult(result, "multiplication");
      break;
    case "divide":
      result = divideNumbers(num1, num2);
      if (typeof result === "string") {
        showError(result);
      } else {
        showResult(result, "division");
      }
      break;
    default:
      console.error("Unknown operation: " + operation);
      showError("Unknown operation");
  }
}

console.log("\n---SETTING UP EVENT LISTENERS---");

operationButtons.forEach((button) => {
    button.addEventListener("click", handleOperationClick);
    console.log("Added event listener for " + button.textContent + " button");
});

clearButton.addEventListener("click", function (event) {
    console.log("---CLEAR BUTTON CLICKED---");
    logEventDetails(event);
    clearAll();
});

numberOne.addEventListener("focus", function (event) {
  console.log("NumberOne input focused");
  event.target.style.backgroundColor = "#e3f2fd";
});

numberOne.addEventListener("blur", function (event) {
  console.log("NumberOne input lost focus");
  event.target.style.backgroundColor = "";
});

numberTwo.addEventListener("focus", function (event) {
  console.log("NumberTwo input focused");
  event.target.style.backgroundColor = "#e3f2fd";
});

numberTwo.addEventListener("blur", function (event) {
  console.log("NumberTwo input lost focus");
  event.target.style.backgroundColor = "";
});


operationButtons.forEach((button) => {
  button.addEventListener("mouseover", function (event) {
    console.log("Mouse over " + event.target.textContent + " button");
  });

  button.addEventListener("mouseout", function (event) {
    console.log("Mouse left " + event.target.textContent + " button");
  });
});

console.log("Event listeners attached successfully");
console.log("Math operations widget initialized");
console.log("Try entering numbers and clicking operation buttons");








//Activity 2: Age Checker Application

function checkAge(){
  //get input value
  const ageInput = document.getElementById("ageInput");
  const resultDiv = document.getElementById("result");
  const inputValue = ageInput.value.trim();

  console.log(`User inputs: "${inputValue}"`);

  resultDiv.className = ""; //clears previous input

  if (inputValue === ""){ //check to see if field is populated 
    resultDiv.textContent = "Please enter your age";
    resultDiv.className = "invalid";
    console.log("Results: Empty input");
    return;
  }

  const age = Number(inputValue); //convert to number

  if (isNaN(age)){ //check to see if its a number
    resultDiv.textContent = "Invalid age - please enter a number";
    resultDiv.className = "invalid";
    console.log("Result: Not a number");
    return;
  }

  if (age < 0 || age > 150){ //check for realistic age
    resultDiv.textContent = "Invalid age - please enter a realistic age (0-150)";
    resultDiv.className = "invalid";
    console.log("Result: Out of range");
    return;
  }

  if (age >= 18){ //checking if minor or adult
    resultDiv.textContent =  `You are ${age} years old - You are an adult`;
    resultDiv.className = "adult";
    console.log(`Result: Adult (age: ${age})`);
  }else{
    resultDiv.textContent =  `You are ${age} years old - You are a minor`;
    resultDiv.className = "minor";
    console.log(`Result: Minor (age: ${age})`);
  }

  
}
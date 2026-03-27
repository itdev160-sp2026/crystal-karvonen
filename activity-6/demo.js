// Activity 6: Function and Scope Demonstrations
// This file contains learning demonstrations separate from the main application


//Part A: Function Demo
console.log("---Function demonstrations---");

//function declaration
function addNumbers(a, b){
    let total = a + b;
    console.log("Function declaration: ", a, " + ", b, " = ", total);
    return total;  
}

//function expression
const addNumbers2 = function(a, b){
    let total = a + b;
    console.log("Function expression: ", a, " + ", b, " = ", total);
    return total;
}

//arrow function
const addNumbers3 = (a, b) => {
    let total = a + b;
    console.log("Arrow function: ", a, " + ", b, " = ", total);
    return total; 
}

console.log("Testing function types: ");
console.log("Function declaration: ", addNumbers(4, 5));
console.log("Function expression: ", addNumbers2(3, 8));
console.log("Arrow function: ", addNumbers3(2, 7));

//Scope Section

let global = "This is a global variable";

function scopeDemo(){
    let local = "This is a local variable";

    console.log("Inside function: ");
    console.log(global);
    console.log(local);
}

scopeDemo();
console.log("Outside function: ");
console.log(global);
//console.log(local); //error



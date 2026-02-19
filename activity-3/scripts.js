

console.log("---Activity 3: Dynamic Greeting Card---");
console.log("---Dom selection demonstrations---");

const greetingMessage = document.getElementById("greeting-message");
const greetingImage = document.getElementById("greeting-image");
const nameInput = document.getElementById("nameInput");

console.log("Selected greeting message element: ", greetingMessage);
console.log("Selected image element: ", greetingImage);
console.log("Selected name: ", nameInput);

const cardContainer = document.querySelector(".card-container");
const firstButton = document.querySelector("button");

console.log("Selected card container: ", cardContainer);
console.log("First Button: ", firstButton)

const allButtons = document.querySelectorAll("button");

console.log(`Found ${allButtons.length} buttons: `, allButtons);

console.log("\n---Content modification examples---");

console.log("Original message textContent: ", greetingMessage.textContent);
console.log("Original image alt attribute: ", greetingImage.getAttribute("alt"));

console.log("\n---Attribute modification demonstration---");

console.log("Current image src: ", greetingImage.getAttribute("src"));
console.log("Image has src attribute: ", greetingImage.hasAttribute("src"));

const greetings = {
    birthday: {
        message: "Happy Birthday!",
        image: "birthday.avif",
        alt: "Birthday picture"
    },
    holiday: {
        message: "Happy Holidays!",
        image: "holiday.jpg",
        alt: "Holiday picture"
    },
    thankYou: {
        message: "Thank You!",
        image: "thank-you.jpg",
        alt: "Thank you picture"
    },
    welcome: {
        message: "Welcome!",
        image: "welcome.jpg",
        alt: "Welcome picture"
    }
};

console.log("\n--Greeting card functions");


function updateGreeting(type) {
    const greeting = greetings[type];
    
    if (greeting) {
        greetingMessage.textContent = greeting.message;
        
        greetingImage.setAttribute("src", greeting.image);
        greetingImage.setAttribute("alt", greeting.alt);
        
        console.log(`Updated greeting to: ${type}`);
        console.log(`Message: ${greeting.message}`);
        console.log(`Image: ${greeting.image}`);
    } else {
        console.error(`Greeting "${type}" not found`);
    }
}


function setBirthdayGreeting() {
    updateGreeting("birthday");
}

function setHolidayGreeting() {
    updateGreeting("holiday");
}

function setThankYouGreeting() {
    updateGreeting("thankYou");
}

function setRandomGreeting() {
    const types = Object.keys(greetings);
    const randomType = types[Math.floor(Math.random() * types.length)];
    updateGreeting(randomType);
    console.log(`Random greeting selected: ${randomType}`);
}

function personalizeGreeting() {
    const name = nameInput.value.trim();
    
    if (name === "") {
        alert("Enter a name to personalize the greeting: ");
        console.log("Personalization attempted with empty name");
        return;
    }
    
    
    const currentMessage = greetingMessage.textContent;
    const personalizedMessage = `${currentMessage} \n\nTo:  ${name}`;
    
    greetingMessage.innerHTML = personalizedMessage.replace('\n\n', '<br><br>');
    
    console.log(`Personalized greeting for: ${name}`);
    console.log(`Full message: ${personalizedMessage}`);
    
    nameInput.value = "";
}

document.getElementById("output").innerHTML = `
    <h3>DOM Manipulation Demo Loaded!</h3>
    <p>Successfully selected and ready to manipulate DOM elements</p>
    <p>Check the console for detailed demonstrations of DOM operations</p>
`;

console.log("Dynamic Greeting Card application loaded successfully!");






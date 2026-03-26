
console.log("\n---Activity 4---");

//global variables
let tasks = [];
let taskIdCounter = 1;

//Part A: Element creation demos
console.log("\n---Element Creation Demonstrations---");

const demoDiv = document.createElement("div");
const demoSpan = document.createElement("span");
const demoButton = document.createElement("button");

console.log("Created div element: ", demoDiv);
console.log("Created span element: ", demoSpan);
console.log("Created button element: ", demoButton);

//Setting properties
demoDiv.textContent = "This is a demo div";
demoDiv.id = "demo-div";
demoSpan.innerHTML = "<strong>Demo span with HTML</strong>";
demoButton.textContent = "Demo Button";

console.log("Div after setting properties: ", demoDiv);
console.log("Div textContent: ", demoDiv.textContent);
console.log("Div id: ", demoDiv.id);


//Part B: Element styling demos
console.log("\n---Element Styling Demo---");

//Direct style modification
demoDiv.style.backgroundColor = "lightblue";
demoDiv.style.padding = "10px";
demoDiv.style.border = "1px solid blue";

console.log("Applied direct styles to demo div");

//Classlist demo
demoDiv.classList.add("demo-class");
demoDiv.classList.add("highlighted");
console.log("Added classes. ClassList: ", demoDiv.classList);
console.log("Has 'demo-class': ", demoDiv.classList.contains("demo-class"));

demoDiv.classList.remove("highlighted");
console.log("After removing 'highlighted': ", demoDiv.classList);

demoDiv.classList.toggle("active");
console.log("After toggling 'active': ", demoDiv.classList);

//Add spacing
demoSpan.style.marginTop = "10px";
demoSpan.style.display = "block";
demoButton.style.marginTop = "10px";
demoButton.style.display = "block";

console.log("Applied spacing styles to demo span and button");


//Part C: Element appending demos
console.log("\n---Element appending demo---");

const outputDiv = document.getElementById("output");
console.log("Output div before appending: ", outputDiv.children.length, "children");


//Appending demo elements
outputDiv.appendChild(demoDiv);
outputDiv.appendChild(demoSpan);
outputDiv.appendChild(demoButton);

console.log("Output div after appending: ", outputDiv.children.length, "children");



//Part D: To do list core functional
console.log("\n---To-Do List Functionality---");

//Fires when button is pressed, creates list item
function addTask(){
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    console.log(`Attempting to add task: "${taskText}"`);
    //validate input
    if (taskText === "") {
        alert("Please enter a task");
        console.log("Task addition failed: Empty input");
        return;
    }

    if (taskText.length > 100) {
        alert("Please keep task length under 100 characters");
        console.log("Task addition failed: Too long");
        return;
    }

    //create task object
    const task = {
        id: taskIdCounter++,
        text: taskText,
        completed: false,
        createdAt: new Date()
    };

    //adding to array
    tasks.push(task);
    console.log("Task added to array: ", task);

    //create list item element
    const listItem = createTaskElement(task);

    //append to list
    const todoList = document.getElementById("todo-list");
    todoList.appendChild(listItem); 

    //clear input
    taskInput.value = "";

    //updating tasks
    updateTaskStats();

    console.log(`Task "${taskText}" added successfully. Total tasks: ${tasks.length}`);


}

function createTaskElement(task){

//create list item
    const listItem = document.createElement("li");
    listItem.className = "task-item";
    listItem.setAttribute("data-task-id", task.id);
    

    //create task text span
    const taskTextSpan = document.createElement("span");
    taskTextSpan.className = "task-text";
    taskTextSpan.textContent = task.text;


    //create status span
    const statusSpan = document.createElement("span");
    statusSpan.className = "task-status"; 

    //set initial state
    if(task.completed){
        listItem.classList.add("done");
        statusSpan.textContent = "\u2713 Done";
        statusSpan.className += " status-done"; //taking what's there and adding to it
    }else{
        statusSpan.textContent = "\u23F3 Pending";
        statusSpan.className += " status-pending";
    }

    listItem.appendChild(taskTextSpan);
    listItem.appendChild(statusSpan);

    //adds a function to the onclick, that calls another function
    listItem.onclick = function(){
        toggleTaskCompletion(task.id);
    };

    console.log("Created task element: ", listItem);
    return listItem;
    


};

//Part E: Task state management
//closure, holds reference to variable that is previously set in outer scope 
function toggleTaskCompletion(taskId){
    console.log("Toggling completion for task ID: ", taskId);

    const task = tasks.find(t => t.id === taskId) 
    if (!task) {
        console.error("Task with id ", taskId, " not found");
        return;
    }

    //toggle completioin
    task.completed = !task.completed;
    //if task completed then mark as completed, else pending
    console.log(`Task "${task.text}" is now ${task.completed ? "completed" : "pending"}`); 

    //find and update dom element
    const listItem = document.querySelector(`[data-task-id ="${taskId}"]`);
    const statusSpan = listItem.querySelector(".task-status");

    if (task.completed) {
        listItem.classList.add("done");
        statusSpan.textContent = "\u2713 Done";
        statusSpan.className = "task-status status-done";       
    }else{
        listItem.classList.remove("done");
        statusSpan.textContent = "\u23F3 Pending";
        statusSpan.className = "task-status status-pending";
    }

    updateTaskStats();

};

function updateTaskStats(){
        const totalTasks = tasks.length;
        //takes the array of tasks, iterates over them to see which ones are completed and adds them to another array
        const completedTasks = tasks.filter(task => task.completed).length;
        const pendingTasks = totalTasks - completedTasks;

        //update statistic DOM elements
        document.getElementById("taskCount").textContent = `(${totalTasks} task${totalTasks !== 1 ? "s" : ""})`;
        document.getElementById("totalTasks").textContent = `Total: ${totalTasks}`;
        document.getElementById("completedTasks").textContent = `Completed: ${completedTasks}`;
        document.getElementById("pendingTasks").textContent = `Pending: ${pendingTasks}`;
    
        console.log(`Stats updated - Total: ${totalTasks}, Completed: ${completedTasks}, Pending: ${pendingTasks}`);
    };
    //add enter key functionality
        document.getElementById("taskInput").onkeydown = function(event){
            if (event.key === "Enter") {
                addTask();
            }
        }

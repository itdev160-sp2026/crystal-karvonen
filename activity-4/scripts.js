
console.log("\n---Activity 4---");

//global variables
let tasks = [];
let taskIdCounter = 1;

//Part A: Element creation demos

//Part B: Element styling demos

//Part C: Element appending demos

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

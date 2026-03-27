
console.log("\n---Activity 6---");

let todoState = {
    tasks: [],
    nextId: 1,
    currentFilter: "all"
};

//Part D: To do list core functional
console.log("\n---To-Do List Functionality---");

//Fires when button is pressed, creates list item

function createTask(taskText, priority = "medium"){
   
    const task = {
        id: todoState.nextId++,
        priority: priority,
        text: taskText,
        completed: false,
        createdAt: new Date()
    };

    return task;
}

function getTaskText(){
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    const priority = document.getElementById("prioritySelect").value;
    return {taskText: taskText, priority: priority};
}

function validateTask(taskText){
    console.log(`Attempting to add task: "${taskText}"`);
    //validate input
    if (taskText === "") {
        console.log("Task addition failed: Empty input");
        return { valid: false, message: "Please enter a task" };
    }

    if (taskText.length > 100) {
        console.log("Task addition failed: Too long");
        return { valid: false, message: "Task is too long" }
    }

    return { valid: true };
}

function addTask(){
    let { taskText, priority } = getTaskText(); 

    validation = validateTask(taskText);
    
    if (!validation.valid){
        alert(validation.message);
    }else{
        const task = createTask(taskText, priority);
        todoState.tasks.push(task);
        console.log("Task added to array: ", task);

        const listItem = createTaskElement(task);

        //append to list
        const todoList = document.getElementById("todo-list");
        todoList.appendChild(listItem); 

        //clear input
        document.getElementById("taskInput").value = "";
        //updating tasks
        updateTaskStats();

        console.log(`Task "${taskText}" added successfully. Total tasks: ${todoState.tasks.length}`);
        }
}

function createTaskElement(task){

//create list item
    const listItem = document.createElement("li");
    listItem.className = "task-item";
    listItem.setAttribute("data-task-id", task.id);

    
    //create priority div to be added to the list
    const priorityDiv = document.createElement("div");
    priorityDiv.className = `task-priority priority-${task.priority}`;
    listItem.appendChild(priorityDiv);

    //create a task div to be added to the list
    const taskDiv = document.createElement("div");
    taskDiv.className = "task-text";
    taskDiv.textContent = task.text;
    listItem.appendChild(taskDiv);
    taskDiv.addEventListener("dblclick", function(){ 
        const inputElement = document.createElement("input");
        inputElement.className = "edit-input";
        taskDiv.innerHTML = "";
        taskDiv.appendChild(inputElement);
        inputElement.value = task.text;
        
        inputElement.onkeydown = function(event){
        if (event.key === "Enter") {
            task.text = inputElement.value;
            taskDiv.textContent = task.text;

        }
        }
    });
   

   
    const timeStampDiv = document.createElement("div");
    timeStampDiv.className = "time-stamp";
    timeStampDiv.textContent = task.createdAt.toLocaleString();
    listItem.appendChild(timeStampDiv);

    //create action button div
    const taskActions = document.createElement("div");
    taskActions.className = "task-actions";

    //create done/pending toggle
    const toggleButton = document.createElement("button");
    toggleButton.className = "task-btn toggle-btn";
    toggleButton.textContent = "Done";
    toggleButton.onclick = function(){
        toggleTaskStatus(task.id);
    };

    //create delete button
    const deleteButton = document.createElement("button");
    deleteButton.className = "task-btn delete-btn";
    deleteButton.textContent = "Delete";
    deleteButton.onclick = function(){
        deleteTask(task.id);
    };

    //add to div
    taskActions.appendChild(toggleButton);
    taskActions.appendChild(deleteButton);
    listItem.appendChild(taskActions);

    console.log("Created task element: ", listItem);
    return listItem;
};

function deleteTask(taskId){
    const taskIndex = todoState.tasks.findIndex(t => t.id === taskId); //for each task(t), check if the id matches taskId
    if(taskIndex === -1){ //if not found, return
        console.log("Task not found");
        return;
    }else{
        if(confirm("Are you sure you want to delete this task?")){
            todoState.tasks.splice(taskIndex, 1); //remove one item at given index
            const taskElement = document.querySelector(`[data-task-id="${taskId}"]`);
            taskElement.remove();
            updateDisplay();
            console.log("Task deleted");
        }
    }
}

function toggleTaskStatus(taskId){
    const task = todoState.tasks.find(t => t.id === taskId);
    if (!task) {
        console.error("Task with id ", taskId, " not found");
        return;
    }

    const listItem = document.querySelector(`[data-task-id ="${taskId}"]`);
    const toggleBtn = listItem.querySelector(".toggle-btn");

    task.completed = !task.completed;

    if (task.completed) {
        listItem.classList.add("completed");
        toggleBtn.textContent = "\u2713 Done";
    }else{
        listItem.classList.remove("completed");
        toggleBtn.textContent = "\u23F3 Pending";
    }

    updateTaskStats();

}

function updateDisplay(){
    updateTaskStats();
    updateEmptyState();
}

function filterTasks(filterType){
    todoState.currentFilter = filterType;
    const taskElements = document.querySelectorAll(".task-item");

    taskElements.forEach(element => {
        const taskId = parseInt(element.getAttribute("data-task-id"));
        const task = todoState.tasks.find(t => t.id === taskId)

        if(filterType === "all"){
            element.classList.remove("hidden");
        }else if(filterType === "pending"){
            if(!task.completed){
                element.classList.remove("hidden");
            }else{
                element.classList.add("hidden");
            }
        }else{
            if(task.completed){
                element.classList.remove("hidden");
            }else{
                element.classList.add("hidden");
            }
        }
        
    });

    document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
    document.querySelector(`[data-filter="${filterType}"]`).classList.add("active");

}

function updateEmptyState(){
    const visibleTasks = document.querySelectorAll(".task-item:not(.hidden)");
    const emptyState = document.getElementById("emptyState");

    if(visibleTasks.length === 0){
        emptyState.classList.remove("hidden");
    }else{
        emptyState.classList.add("hidden");
    }
}

function initializeEventListeners(){
    document.getElementById("addTaskBtn").addEventListener("click", addTask);

    document.getElementById("taskInput").onkeydown = function(event){
        if (event.key === "Enter") {
            addTask();
        }
    }
           
    const filters = document.querySelectorAll(".filter-btn");
    filters.forEach(element =>{
        const filterId = element.getAttribute("data-filter");
        element.addEventListener("click", function(){
            filterTasks(filterId);
        });
    });
    document.getElementById("markAllDoneBtn").addEventListener("click", markAllDone);
    document.getElementById("deleteCompletedBtn").addEventListener("click", deleteCompleted);
    document.getElementById("clearAllBtn").addEventListener("click", clearAll);
}

function clearAll(){
    if(confirm("Are you sure you want to delete all tasks?")){
        todoState.tasks = [];
        document.getElementById("todo-list").innerHTML = "";
        updateDisplay();
    }
}

function markAllDone(){
    todoState.tasks.forEach(task =>{
        task.completed = true;
        const listItem = document.querySelector(`[data-task-id ="${task.id}"]`);
        const toggleBtn = listItem.querySelector(".toggle-btn");
        listItem.classList.add("completed");
        toggleBtn.textContent = "\u2713 Done";

    });
    updateDisplay();
}

function deleteCompleted(){
    const completedTasks = todoState.tasks.filter(task => task.completed);
    completedTasks.forEach(task => {
        const listElement = document.querySelector(`[data-task-id ="${task.id}"]`);
        listElement.remove(); 
    });
    todoState.tasks = todoState.tasks.filter(task => !task.completed);
    updateDisplay();
    console.log("Completed tasks deleted");
}

function initializeApp(){
    initializeEventListeners();
    updateDisplay();
}



function updateTaskStats(){
        const totalTasks = todoState.tasks.length;
        //takes the array of tasks, iterates over them to see which ones are completed and adds them to another array
        const completedTasks = todoState.tasks.filter(task => task.completed).length;
        const pendingTasks = totalTasks - completedTasks;

        //update statistic DOM elements
        document.getElementById("taskCount").textContent = `(${totalTasks} task${totalTasks !== 1 ? "s" : ""})`;
        document.getElementById("totalTasks").textContent = `Total: ${totalTasks}`;
        document.getElementById("completedTasks").textContent = `Completed: ${completedTasks}`;
        document.getElementById("pendingTasks").textContent = `Pending: ${pendingTasks}`;
    
        console.log(`Stats updated - Total: ${totalTasks}, Completed: ${completedTasks}, Pending: ${pendingTasks}`);
    };


    initializeApp();

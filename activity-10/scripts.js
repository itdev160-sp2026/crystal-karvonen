console.log("=== Activity 10: Tic-Tac-Toe with localStorage ===");

console.log("\n=== LOCALSTORAGE DEMONSTRATIONS ===");

localStorage.setItem("demo-string", "Hello localStorage!");
console.log("Stored string:", localStorage.getItem("demo-string"));

const demoObject = { player: "X", score: 3 };
localStorage.setItem("demo-object", JSON.stringify(demoObject));
const retrievedObject = JSON.parse(localStorage.getItem("demo-object"));
console.log("Stored object:", retrievedObject);

localStorage.removeItem("demo-string");
localStorage.removeItem("demo-object");
console.log("Demo items cleaned up");

//==GAME==

const cells = document.querySelectorAll(".cell");
const playerLabel = document.querySelector("#statusMessage");
const newGameButton = document.querySelector("#newGameBtn");
const isOccupied = (currentValue) => currentValue != "";

console.log("\nGame state management:\n");

let gameState = {
    board: ["", "", "", "", "", "", "", "", ""],
    currentPlayer: "X",
    gameStatus: false,
    winner: null,
    winningCombo: null
};

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//==GAME LOGIC==

function makeMove(e){
    let cellNum = Number(e.target.dataset.index);
    if(gameState.board[cellNum] !== "" || gameState.gameStatus){
        return;
    }

    gameState.board[cellNum] = gameState.currentPlayer;
    cells[cellNum].textContent = gameState.currentPlayer;
    cells[cellNum].classList.add("taken");
    cells[cellNum].classList.add(gameState.currentPlayer.toLowerCase());
    
    console.log(`Clicked: Cell ${cellNum}`);
    console.log(`Player: ${gameState.currentPlayer}`);

    if (checkWinner()) {
        console.log("Winner found!"); 
    } else if (checkGameOver()) {
        console.log("It's a draw!");
    } else {
        changePlayer();
    }
     saveGameState();        
}

function changePlayer(){
    if(gameState.currentPlayer === "X"){
        gameState.currentPlayer = "O";
        playerLabel.textContent = "Player O's Turn";

    }else{
        gameState.currentPlayer = "X";
        playerLabel.textContent = "Player X's Turn";
    }
}

function checkGameOver(){
    if(gameState.board.every(isOccupied)){
        playerLabel.textContent = "It's a Draw!";
        playerLabel.classList.add("draw");
        gameState.gameStatus = true;
        return true;
    }else{
        return false;
    }
}

function win(){
    gameState.winningCombo.forEach(index => {
        cells[index].classList.add("winning");
    });

    playerLabel.textContent = "Player " + gameState.currentPlayer + " Wins!";
    playerLabel.classList.add("winner");
}


function checkWinner(){
    for(let combo of winningCombos){
        if(gameState.board[combo[0]] !== "" && 
        gameState.board[combo[0]] === gameState.board[combo[1]] &&
        gameState.board[combo[0]] === gameState.board[combo[2]]){
            gameState.winner = gameState.currentPlayer;
            gameState.gameStatus = true;
            gameState.winningCombo = combo;
            win();
        }
    }
    return gameState.gameStatus;
}

function clearBoard(){
    gameState = {
        board: ["", "", "", "", "", "", "", "", ""],
        currentPlayer: "X",
        gameStatus: false,
        winner: null,
        winningCombo: null,
    };

    cells.forEach(cell => {
        cell.textContent = "";
        cell.className = "cell";
    });

    playerLabel.className = "status-message";
    playerLabel.textContent = "Player X's Turn";
}

//==LOCAL STORAGE INTEGRATION==

console.log("\nLocal storage integration:\n");

function saveGameState(){
    localStorage.setItem("game", JSON.stringify(gameState)); 
    console.log("Game state saved to local storage");
}

function loadGameState(){
    let gotItem = localStorage.getItem("game");
    if(gotItem){
        let parseGame = JSON.parse(gotItem);
        gameState = parseGame;
        return true;
    }else{
        return false;
    }
}

function updateBoard(){
    cells.forEach((cell, index) => {
        const value = gameState.board[index];
        cell.textContent = value;
        cell.className = "cell";
        if(value !== ""){
            cell.classList.add("taken");
            cell.classList.add(value.toLowerCase());
        }
        if(gameState.winningCombo && gameState.winningCombo.includes(index)){
            cell.classList.add("winning");
        }
    });

    playerLabel.className = "status-message";
    if(gameState.winner){
        playerLabel.textContent = "Player " + gameState.winner + " Wins!";
        playerLabel.classList.add("winner");
    } else if(gameState.gameStatus){
        playerLabel.textContent = "It's a Draw!";
        playerLabel.classList.add("draw");
    } else {
        playerLabel.textContent = "Player " + gameState.currentPlayer + "'s Turn";
    }
}

//==INITIALIZING EVENT LISTENERS==

function initializeApp(){
    console.log("Initializing Tic-Tac-Toe application...");

    if(!loadGameState()){
        clearBoard();
    }else{
        updateBoard();
    }

    cells.forEach(cell => {
        cell.addEventListener("click", makeMove);
    });

    newGameButton.addEventListener("click", clearBoard);

    
    console.log("Tic-Tac-Toe application initialized successfully!");
}

initializeApp();




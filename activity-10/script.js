// Activity 10: Tic-Tac-Toe with localStorage
// Demonstrates localStorage, JSON serialization, and game state persistence

console.log("=== Activity 10: Tic-Tac-Toe with localStorage ===");

// Part A: localStorage Demonstrations
console.log("\n=== LOCALSTORAGE DEMONSTRATIONS ===");

// String storage
localStorage.setItem("demo-string", "Hello localStorage!");
console.log("Stored string:", localStorage.getItem("demo-string"));

// Object storage (requires JSON serialization)
const demoObject = { player: "X", score: 3 };
localStorage.setItem("demo-object", JSON.stringify(demoObject));
const retrievedObject = JSON.parse(localStorage.getItem("demo-object"));
console.log("Stored object:", retrievedObject);

// Clean up demo items
localStorage.removeItem("demo-string");
localStorage.removeItem("demo-object");
console.log("Demo items cleaned up");

// Part B: Game State Management
console.log("\n=== GAME STATE MANAGEMENT ===");

const STORAGE_KEY = "tictactoe-game-state";

// Game state
let gameState = {
  board: ["", "", "", "", "", "", "", "", ""],
  currentPlayer: "X",
  gameActive: true,
  winner: null,
  winningCombination: null,
};

// Winning combinations
const WINNING_COMBINATIONS = [
  [0, 1, 2], // Top row
  [3, 4, 5], // Middle row
  [6, 7, 8], // Bottom row
  [0, 3, 6], // Left column
  [1, 4, 7], // Middle column
  [2, 5, 8], // Right column
  [0, 4, 8], // Diagonal top-left to bottom-right
  [2, 4, 6], // Diagonal top-right to bottom-left
];

// Initialize new game
function initializeGame() {
  gameState = {
    board: ["", "", "", "", "", "", "", "", ""],
    currentPlayer: "X",
    gameActive: true,
    winner: null,
    winningCombination: null,
  };

  updateBoard();
  updateStatus();
  saveGameState();
  console.log("New game initialized");
}

// Make a move
function makeMove(index) {
  if (!gameState.gameActive || gameState.board[index] !== "") {
    return;
  }

  gameState.board[index] = gameState.currentPlayer;

  const result = checkWinner();

  if (result.winner) {
    gameState.gameActive = false;
    gameState.winner = result.winner;
    gameState.winningCombination = result.combination;
    console.log(`Game over! Winner: ${result.winner}`);
  } else if (gameState.board.every((cell) => cell !== "")) {
    gameState.gameActive = false;
    console.log("Game over! It's a draw");
  } else {
    gameState.currentPlayer = gameState.currentPlayer === "X" ? "O" : "X";
  }

  updateBoard();
  updateStatus();
  saveGameState();
}

// Check for winner
function checkWinner() {
  for (let combination of WINNING_COMBINATIONS) {
    const [a, b, c] = combination;
    const board = gameState.board;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return { winner: board[a], combination: combination };
    }
  }

  return { winner: null, combination: null };
}

// Part C: localStorage Integration
console.log("\n=== LOCALSTORAGE INTEGRATION ===");

// Save game state
function saveGameState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));
  console.log("Game state saved to localStorage");
}

// Load game state
function loadGameState() {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved) {
    gameState = JSON.parse(saved);
    console.log("Game state loaded from localStorage:", gameState);
    return true;
  }
  return false;
}

// Part D: UI Update Functions

function updateBoard() {
  const cells = document.querySelectorAll(".cell");

  cells.forEach((cell, index) => {
    const value = gameState.board[index];

    cell.textContent = value;
    cell.classList.remove("taken", "x", "o", "winning");

    if (value) {
      cell.classList.add("taken");
      cell.classList.add(value.toLowerCase());
    }

    if (
      gameState.winningCombination &&
      gameState.winningCombination.includes(index)
    ) {
      cell.classList.add("winning");
    }
  });
}

function updateStatus() {
  const statusElement = document.getElementById("statusMessage");

  statusElement.classList.remove("winner", "draw");

  if (gameState.winner) {
    statusElement.textContent = `Player ${gameState.winner} wins! \uD83C\uDFC6`;
    statusElement.classList.add("winner");
  } else if (!gameState.gameActive) {
    statusElement.textContent = "It's a draw! \uD83E\uDD1D";
    statusElement.classList.add("draw");
  } else {
    statusElement.textContent = `Player ${gameState.currentPlayer}'s turn`;
  }
}

// Event handlers
function handleCellClick(event) {
  const cell = event.target;
  if (!cell.classList.contains("cell")) return;

  const index = parseInt(cell.getAttribute("data-index"));
  makeMove(index);
}

// Initialize application
function initializeApp() {
  console.log("Initializing Tic-Tac-Toe application...");

  const hasGameState = loadGameState();

  if (!hasGameState) {
    initializeGame();
  } else {
    updateBoard();
    updateStatus();
  }

  // Set up event listeners
  document
    .getElementById("gameBoard")
    .addEventListener("click", handleCellClick);
  document
    .getElementById("newGameBtn")
    .addEventListener("click", initializeGame);

  console.log("Tic-Tac-Toe application initialized successfully!");
}

// Start the application
initializeApp();

//Activity 11: React Tic-Tac-Toe
//This React version demonstrates: 
//Component-based architecture (Square, Board, Game)
//Props for passing data to child components 
//useState for state management 
//Event handling in React 
//Lifting state up to share between components
//Immutability with array copying (.slice())
//Rendering lists with .map()
//Time travel feature using game history

function Square({value, onSquareClick}) { //returning a button called square that takes a "value" and has onSquareClick attached to it
  return (
    <button className="square" onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({xIsNext, squares, onPlay}) {
  function handleClick(i) { 
    if (squares[i] || calculateWinner(squares)) { //if the square at the passed index is filled, or if there is a winner
      return;
    }
    const nextSquares = squares.slice(); //if not, make a copy of the array called nextSquares
    nextSquares[i] = xIsNext ? "X" : "O"; //fill the given index with an X if xIsNext returns true, else fill it with an O
    onPlay(nextSquares);  //passes updated board to game to save the history
  }


  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }


  return ( //returning the status we just figured out above, and the 9 squares
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}


function Game() {
  const [history, setHistory] = React.useState([Array(9).fill(null)]); //history of all board states called history, updated by setHistory
  const [currentMove, setCurrentMove] = React.useState(0); //tracks what move we are on starting from 0
  const xIsNext = currentMove % 2 === 0; //x is next when the current moves are even
  const currentSquares = history[currentMove]; 

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares]; //remove any future moves if we have time traveled
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function newGame(){
    setHistory([Array(9).fill(null)]);
    setCurrentMove(0);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  const moves = history.map((squares, move) => { //creating a button for each new move in the history tab. 
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button
          className={move === currentMove ? "current-move" : ""} //highlights the current move
          onClick={() => jumpTo(move)}
        >
          {description}
        </button>
      </li>
    );
  });

  return ( //returns the whole game layout, adding the list of buttons for each move
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <h2>Move History</h2>
        <button className="newGameButton" onClick={() => newGame()}>New Game</button>
        <ol className="moves-list">{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) { //pretty much same as javascript logic for this. i get it
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


const root = ReactDOM.createRoot(document.getElementById("root")); //render game component
root.render(<Game />);


    const Square = ({ takeTurn, id, disabled }) => {
      const mark = ["O", "X", "+"];
      const [filled, setFilled] = React.useState(false);
      const [tik, setTik] = React.useState(2);
    
      return (
        <button
          onClick={() => {
            if (filled || disabled) return;
            setTik(takeTurn(id));
            setFilled(true);
            console.log(`Square: ${id} filled by player : ${tik}`);
          }}
        >
          <h1>{mark[tik]}</h1>
        </button>
      );
    };
const Board = () => {
  // 1st player is X ie 1
  // State keeps track of next player and gameState
  const [player, setPlayer] = React.useState(1);
  const [gameState, setGameState] = React.useState([]);
  const [status, setStatus] = React.useState({
    text: "No winner yet.",
    hasWinner: false,
  });
  const [squaresKey, setSquaresKey] = React.useState(0);

  React.useEffect(() => {
    const checkWinner = checkForWinner(gameState);
    console.log("checking for winner ", checkWinner);
    setStatus(checkWinner);
  }, [gameState]);

  const takeTurn = (id) => {
    setGameState([...gameState, { id: id, player: player }]);
    setPlayer((player + 1) % 2); // get next player
    return player;
  };
  const handleResetGame = () => {
    console.log("resetting game");
    setPlayer(1);
    setGameState([]);
    setStatus({
      text: "No winner yet.",
      hasWinner: false,
    });
    setSquaresKey(squaresKey + 1);
  };

  function renderSquare(i) {
    // use properties to pass callback function takeTurn to Child
    return (
      <Square
        disabled={status.hasWinner}
        takeTurn={takeTurn}
        key={`${i}_${squaresKey}`}
        id={i}
      ></Square>
    );
  }
  return (
    <div className="game-board">
      <div className="grid-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="grid-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="grid-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <div id="info">
        <h1>{status.hasWinner ? `Winner is ${status.text}` : status.text}</h1>
      </div>
      <br />

      <div id="reset">
        <button disabled={gameState === []} onClick={handleResetGame}>
          New Game
        </button>
      </div>
    </div>
  );
};
const win = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 5, 6],
];
const checkForWinner = (gameState) => {
  // get array of box id's
  // can't be a winner in less than 5 turns
  if (gameState.length < 5) return { text: "No Winner Yet", hasWinner: false };
  let p0 = gameState.filter((item) => {
    if (item.player == 0) return item;
  });
  p0 = p0.map((item) => item.id);
  let px = gameState.filter((item) => {
    if (item.player == 1) return item;
  });
  px = px.map((item) => item.id);
  if (p0 != null && px != null) {
    var win0 = win.filter((item) => {
      return isSuperset(new Set(p0), new Set(item));
    });
    var winX = win.filter((item) => {
      return isSuperset(new Set(px), new Set(item));
    });
  }
  if (win0.length > 0) return { text: "Player O ", hasWinner: true };
  else if (winX.length > 0) return { text: "Player X ", hasWinner: true };
  return { text: "No Winner Yet", hasWinner: false };
};
// check if subset is in the set
function isSuperset(set, subset) {
  for (let elem of subset) {
    if (!set.has(elem)) {
      return false;
    }
  }
  return true;
}
const Game = () => {
  return (
    <div className="game">
      <Board></Board>
    </div>
  );
};

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
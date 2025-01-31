import "./TicTacToe.css";
import useGame from "./useGame";

export default function TicTacToe() {
  const { gameBoard, onSelect, getMessage } = useGame();

  const handleClick = (event: any) => {
    const value = event.target.getAttribute("cell-id");
    onSelect(parseInt(value));
  };
  return (
    <div>
      <h2>TicTacToe</h2>
      <div
        className="tictactoe-board"
        style={{
          gridTemplateRows: `repeat(${3},1fr)`,
          gridTemplateColumns: `repeat(${3},1fr)`,
        }}
        onClick={handleClick}
      >
        {gameBoard.map((item, idx) => (
          <div key={idx} className="tictactoe-cell flex-center" cell-id={idx}>
            {item}
          </div>
        ))}
      </div>
      <div>{getMessage()}</div>
    </div>
  );
}

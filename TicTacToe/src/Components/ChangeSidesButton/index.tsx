import { Board, Choice, Mode } from "../../helpers/types";
import { getBestMove, getEmptyBoard } from "../../helpers/utils";

interface ChangeSidesButtonProps {
  choice: Choice;
  setChoice: (choice: Choice) => void;
  setBoard: (board: Board) => void;
  mode: Mode;
}

export default function ChangeSidesButton({
  choice,
  setChoice,
  setBoard,
  mode,
}: ChangeSidesButtonProps) {
  return (
    <button
      className="inactive"
      onClick={() => {
        const newBoard = getEmptyBoard();
        const newChoice = choice === "O" ? "X" : "O";
        setBoard(newBoard);
        setChoice(newChoice);
        if (mode === "vsAI" && newChoice === "X") {
          getBestMove(newBoard, setBoard, newChoice);
        }
      }}
    >
      Change sides
    </button>
  );
}

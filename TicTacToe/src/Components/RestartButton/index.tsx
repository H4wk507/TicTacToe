import { Board, Choice, Mode } from "../../helpers/types";
import { getBestMove, getEmptyBoard } from "../../helpers/utils";

interface RestartButtonProps {
  mode: Mode;
  choice: Choice;
  setBoard: (board: Board) => void;
}

export default function RestartButton({
  mode,
  choice,
  setBoard,
}: RestartButtonProps) {
  return (
    <button
      className="inactive"
      onClick={() => {
        const newBoard = getEmptyBoard();
        setBoard(getEmptyBoard());
        if (mode === "vsAI" && choice === "X") {
          getBestMove(newBoard, setBoard, choice);
        }
      }}
    >
      Restart
    </button>
  );
}

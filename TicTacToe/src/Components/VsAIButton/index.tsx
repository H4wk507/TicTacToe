import { Board, Choice, Mode } from "../../helpers/types";
import { getBestMove, getEmptyBoard } from "../../helpers/utils";

interface VsAIButtonProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  setBoard: (board: Board) => void;
  choice: Choice;
}

export default function VsAIButton({
  mode,
  setMode,
  setBoard,
  choice,
}: VsAIButtonProps) {
  return (
    <button
      onClick={() => {
        const newBoard = getEmptyBoard();
        setMode("vsAI");
        setBoard(newBoard);
        if (choice === "X") {
          getBestMove(newBoard, setBoard, choice);
        }
      }}
      className={`${mode === "vsAI" ? "active" : "inactive"}`}
    >
      Play vs AI
    </button>
  );
}

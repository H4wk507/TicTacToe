import { TBoard, Choice, Mode } from "../../helpers/types";
import { getBestMove, getEmptyBoard } from "../../helpers/utils";

interface ChangeSidesButtonProps {
  choice: Choice;
  setChoice: (choice: Choice) => void;
  setBoard: (board: TBoard) => void;
  setWinningLine: (winningLine: [number, number, number] | null) => void;
  mode: Mode;
}

export default function ChangeSidesButton({
  choice,
  setChoice,
  setBoard,
  setWinningLine,
  mode,
}: ChangeSidesButtonProps) {
  return (
    <button
      className="inactive"
      onClick={() => {
        setWinningLine(null);
        const newBoard = getEmptyBoard();
        const newChoice = choice === "O" ? "X" : "O";
        setBoard(newBoard);
        setChoice(newChoice);
        if (mode === "vsAI" && newChoice === "X") {
          const bestMoveIdx = getBestMove(newBoard, choice);
          setBoard(
            newBoard.map((cell, i) => (i === bestMoveIdx ? choice : cell)),
          );
        }
      }}
    >
      Change sides
    </button>
  );
}

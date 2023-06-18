import { TBoard, Choice, Mode } from "../../helpers/types";
import { getBestMove, getEmptyBoard } from "../../helpers/utils";

interface ChangeSidesButtonProps {
  choice: Choice;
  setChoice: (choice: Choice) => void;
  setBoard: (board: TBoard) => void;
  setWinningLine: (winningLine: [number, number, number] | null) => void;
  mode: Mode;
  started: boolean;
}

export default function ChangeSidesButton({
  choice,
  setChoice,
  setBoard,
  setWinningLine,
  mode,
  started,
}: ChangeSidesButtonProps) {
  return (
    <button
      onClick={() => {
        setWinningLine(null);
        const newBoard = getEmptyBoard();
        setBoard(newBoard);
        const newChoice = choice === "O" ? "X" : "O";
        setChoice(newChoice);
        if (mode === "vsAI" && newChoice === "X") {
          const bestMoveIdx = getBestMove(newBoard, choice);
          setBoard(
            newBoard.map((cell, i) => (i === bestMoveIdx ? choice : cell)),
          );
        }
      }}
      className={started ? "red" : "orange"}
      disabled={started}
    >
      Change sides
    </button>
  );
}

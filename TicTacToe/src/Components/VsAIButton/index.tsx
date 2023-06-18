import { TBoard, Choice, Mode } from "../../helpers/types";
import { getBestMove, getEmptyBoard } from "../../helpers/utils";

interface VsAIButtonProps {
  mode: Mode;
  setMode: (mode: Mode) => void;
  setBoard: (board: TBoard) => void;
  choice: Choice;
  setWinningLine: (winningLine: [number, number, number] | null) => void;
  started: boolean;
}

export default function VsAIButton({
  mode,
  setMode,
  setBoard,
  choice,
  setWinningLine,
  started,
}: VsAIButtonProps) {
  return (
    <button
      onClick={() => {
        if (started) {
          return;
        }
        setWinningLine(null);
        const newBoard = getEmptyBoard();
        const enemyChoice = choice === "O" ? "X" : "O";
        setMode("vsAI");
        setBoard(newBoard);
        if (choice === "X") {
          const bestMoveIdx = getBestMove(newBoard, choice);
          setBoard(
            newBoard.map((cell, i) => (i === bestMoveIdx ? enemyChoice : cell)),
          );
        }
      }}
      className={mode === "vsAI" ? "active" : started ? "red" : "inactive"}
    >
      Play vs AI
    </button>
  );
}

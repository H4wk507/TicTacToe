import { TBoard, Choice, Mode } from "../../helpers/types";
import { getBestMove, getEmptyBoard } from "../../helpers/utils";

interface RestartButtonProps {
  mode: Mode;
  choice: Choice;
  setBoard: (board: TBoard) => void;
  setWinningLine: (winningLine: [number, number, number] | null) => void;
  setStarted: (started: boolean) => void;
}

export default function RestartButton({
  mode,
  choice,
  setBoard,
  setWinningLine,
  setStarted,
}: RestartButtonProps) {
  return (
    <button
      className="inactive"
      onClick={() => {
        setStarted(false);
        setWinningLine(null);
        const newBoard = getEmptyBoard();
        const enemyChoice = choice === "O" ? "X" : "O";
        setBoard(getEmptyBoard());
        if (mode === "vsAI" && choice === "X") {
          const bestMoveIdx = getBestMove(newBoard, choice);
          setBoard(
            newBoard.map((cell, i) => (i === bestMoveIdx ? enemyChoice : cell)),
          );
        }
      }}
    >
      Restart
    </button>
  );
}

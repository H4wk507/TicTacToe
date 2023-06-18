import { TBoard, Choice, Mode, Square } from "../../helpers/types";
import { getBestMove, getWinner, hasEnded } from "../../helpers/utils";
import styles from "./style.module.scss";

interface BoxProps {
  content: Square;
  idx: number;
  board: TBoard;
  setBoard: (board: TBoard) => void;
  choice: Choice;
  setChoice: (choice: Choice) => void;
  mode: Mode;
  winningLine: [number, number, number] | null;
  setWinningLine: (line: [number, number, number] | null) => void;
  started: boolean;
  setStarted: (started: boolean) => void;
}

export default function Box({
  content,
  idx,
  board,
  setBoard,
  choice,
  setChoice,
  mode,
  winningLine,
  setWinningLine,
  started,
  setStarted,
}: BoxProps) {
  const placeMark = (): void => {
    if (hasEnded(board) || board[idx]) {
      return;
    }
    if (!started) {
      setStarted(true);
    }
    let newBoard = board.map((cell, i) => (i === idx ? choice : cell));
    setBoard(newBoard);
    const enemyChoice = choice === "O" ? "X" : "O";
    if (mode === "vsAI") {
      const bestMoveIdx = getBestMove(newBoard, choice);
      newBoard = newBoard.map((cell, i) =>
        i === bestMoveIdx ? enemyChoice : cell,
      );
      setBoard(newBoard);
    } else {
      setChoice(enemyChoice);
    }

    if (hasEnded(newBoard)) {
      const winner = getWinner(newBoard);
      if (winner !== null) {
        setWinningLine(winner.line);
      }
    }
  };

  return (
    <div
      onClick={placeMark}
      className={`${styles.box} ${
        winningLine?.includes(idx) ? "green" : content !== null && "red"
      }`}
    >
      {content}
    </div>
  );
}

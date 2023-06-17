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
}: BoxProps) {
  const placeMark = (): void => {
    if (hasEnded(board) || board[idx]) {
      return;
    }
    let newBoard = board.map((cell, i) => (i === idx ? choice : cell));
    const enemyChoice = choice === "O" ? "X" : "O";
    setBoard(newBoard);
    if (mode === "vsAI") {
      const bestMoveIdx = getBestMove(newBoard, choice);
      newBoard = newBoard.map((cell, i) =>
        i === bestMoveIdx ? enemyChoice : cell,
      );
      setBoard(newBoard);
    } else {
      setChoice(choice === "O" ? "X" : "O");
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
        winningLine?.includes(idx)
          ? "active"
          : content !== null && "occupied-cell"
      }`}
    >
      {content}
    </div>
  );
}

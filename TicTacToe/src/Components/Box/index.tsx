import { Board, Choice, Mode, Square } from "../../helpers/types";
import { getBestMove, hasEnded } from "../../helpers/utils";
import styles from "./style.module.scss";

interface BoxProps {
  content: Square;
  idx: number;
  board: Board;
  setBoard: (board: Board) => void;
  choice: Choice;
  setChoice: (choice: Choice) => void;
  mode: Mode;
}

export default function Box({
  content,
  idx,
  board,
  setBoard,
  choice,
  setChoice,
  mode,
}: BoxProps) {
  const placeMark = (): void => {
    if (hasEnded(board) || board[idx]) {
      return;
    }
    const newBoard = board.map((cell, i) => (i === idx ? choice : cell));
    setBoard(newBoard);
    if (mode === "vsAI") {
      getBestMove(newBoard, setBoard, choice);
    } else {
      setChoice(choice === "O" ? "X" : "O");
    }
  };

  return (
    <div onClick={placeMark} className={styles.box}>
      {content}
    </div>
  );
}

import { TBoard, Choice, Mode } from "../../helpers/types";
import Box from "../Box";
import styles from "./style.module.scss";

interface BoardProps {
  mode: Mode;
  board: TBoard;
  setBoard: (board: TBoard) => void;
  choice: Choice;
  setChoice: (choice: Choice) => void;
  winningLine: [number, number, number] | null;
  setWinningLine: (winningLine: [number, number, number] | null) => void;
}

export default function Board({
  mode,
  board,
  setBoard,
  choice,
  setChoice,
  winningLine,
  setWinningLine,
}: BoardProps) {
  return (
    <div className={styles.board}>
      {board.map((cell, i) => (
        <Box
          key={i}
          content={cell}
          idx={i}
          board={board}
          setBoard={setBoard}
          choice={choice}
          setChoice={setChoice}
          mode={mode}
          winningLine={winningLine}
          setWinningLine={setWinningLine}
        />
      ))}
    </div>
  );
}

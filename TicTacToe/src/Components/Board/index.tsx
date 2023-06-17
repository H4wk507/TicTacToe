import { TBoard, Choice, Mode } from "../../helpers/types";
import Box from "../Box";
import styles from "./style.module.scss";

interface BoardProps {
  mode: Mode;
  board: TBoard;
  setBoard: (board: TBoard) => void;
  choice: Choice;
  setChoice: (choice: Choice) => void;
}

export default function Board({
  mode,
  board,
  setBoard,
  choice,
  setChoice,
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
        />
      ))}
    </div>
  );
}

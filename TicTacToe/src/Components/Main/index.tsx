import { useState } from "react";
import styles from "./style.module.scss";
import { TBoard, Choice, Mode } from "../../helpers/types";
import { getEmptyBoard } from "../../helpers/utils";
import Result from "../Result";
import VsFriendButton from "../VsFriendButton";
import VsAIButton from "../VsAIButton";
import ChangeSidesButton from "../ChangeSidesButton";
import RestartButton from "../RestartButton";
import Board from "../Board";

export default function Main() {
  const [board, setBoard] = useState<TBoard>(getEmptyBoard());
  const [mode, setMode] = useState<Mode>("vsAI");
  const [choice, setChoice] = useState<Choice>("O");
  const [winningLine, setWinningLine] = useState<
    [number, number, number] | null
  >(null);

  return (
    <div className={styles["center-container"]}>
      <div className={styles.main}>
        <Board
          mode={mode}
          board={board}
          setBoard={setBoard}
          choice={choice}
          setChoice={setChoice}
          winningLine={winningLine}
          setWinningLine={setWinningLine}
        />
        <Result board={board} choice={choice} />
      </div>
      <div className={styles.right}>
        <VsFriendButton
          mode={mode}
          setMode={setMode}
          setBoard={setBoard}
          setWinningLine={setWinningLine}
        />
        <VsAIButton
          mode={mode}
          setMode={setMode}
          setBoard={setBoard}
          choice={choice}
          setWinningLine={setWinningLine}
        />
        <ChangeSidesButton
          mode={mode}
          setChoice={setChoice}
          setBoard={setBoard}
          choice={choice}
          setWinningLine={setWinningLine}
        />
        <RestartButton
          mode={mode}
          choice={choice}
          setBoard={setBoard}
          setWinningLine={setWinningLine}
        />
      </div>
    </div>
  );
}

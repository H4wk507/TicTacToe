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
  const [started, setStarted] = useState(false);

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
          started={started}
          setStarted={setStarted}
        />
        <Result board={board} choice={choice} />
      </div>
      <div className={styles.right}>
        <VsFriendButton
          mode={mode}
          setMode={setMode}
          setBoard={setBoard}
          setWinningLine={setWinningLine}
          started={started}
        />
        <VsAIButton
          mode={mode}
          setMode={setMode}
          setBoard={setBoard}
          choice={choice}
          setWinningLine={setWinningLine}
          started={started}
        />
        <ChangeSidesButton
          mode={mode}
          setChoice={setChoice}
          setBoard={setBoard}
          choice={choice}
          setWinningLine={setWinningLine}
          started={started}
        />
        <RestartButton
          mode={mode}
          choice={choice}
          setBoard={setBoard}
          setWinningLine={setWinningLine}
          setStarted={setStarted}
        />
      </div>
    </div>
  );
}

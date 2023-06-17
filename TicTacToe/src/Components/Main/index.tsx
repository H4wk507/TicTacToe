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

//const Color = Object.freeze({
//  // other color formats do not work with comparison.
//  GREEN: "rgb(1, 121, 51)",
//  YELLOW: "rgb(204, 125, 0)",
//  RED: "rgb(130, 0, 0)",
//});

export default function Main() {
  const [board, setBoard] = useState<TBoard>(getEmptyBoard());
  const [mode, setMode] = useState<Mode>("vsFriend");
  const [choice, setChoice] = useState<Choice>("O");

  return (
    <div className={styles["center-container"]}>
      <div className={styles.main}>
        <Board
          mode={mode}
          board={board}
          setBoard={setBoard}
          choice={choice}
          setChoice={setChoice}
        />
        <Result board={board} choice={choice} />
      </div>
      <div className={styles.right}>
        <VsFriendButton mode={mode} setMode={setMode} setBoard={setBoard} />
        <VsAIButton
          mode={mode}
          setMode={setMode}
          setBoard={setBoard}
          choice={choice}
        />
        <ChangeSidesButton
          mode={mode}
          setChoice={setChoice}
          setBoard={setBoard}
          choice={choice}
        />
        <RestartButton mode={mode} choice={choice} setBoard={setBoard} />
      </div>
    </div>
  );
}

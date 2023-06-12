import { useState } from "react";
import styles from "./style.module.scss";

const choices = ["X", "O"] as const;
const scores = {
  X: 1,
  O: -1,
  TIE: 0,
} as const;

const Color = Object.freeze({
  // other color formats do not work with comparison.
  GREEN: "rgb(1, 121, 51)",
  YELLOW: "rgb(204, 125, 0)",
  RED: "rgb(130, 0, 0)",
});

const gameModes = Object.freeze({
  vsAI: Symbol("vsAI"),
  vsFriend: Symbol("vsFriend"),
});

// default settings
let gameMode = gameModes.vsAI;
let userChoice = choices[0];
let enemyChoice = choices[1];
let currChoice: "O" | "X" = choices[1];
let meStart = true;

type Choice = "X" | "O" | ""; // TODO: change "" to null
type Board = Choice[];

const hasTied = (board: Board) => {
  for (const field of board) {
    if (field === "") return false;
  }
  return true;
};

const getWinner = (board: Board) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (const [a, b, c] of lines) {
    if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const hasEnded = (board: Board) => hasTied(board) || getWinner(board) !== null;

const changeMark = () => {
  const idx = choices.indexOf(currChoice);
  currChoice = choices[idx ^ 1];
};

const game = (idx: number, board: Board, setBoard: (board: Board) => void) => {
  if (!hasEnded(board)) {
    // if the field is already occupied, return
    if (board[idx] !== "") return;

    // place user's mark
    setBoard(
      board.map((cell, i) => {
        if (i === idx) return currChoice;
        return cell;
      }),
    );
    changeMark();
    //if (gameMode === gameModes.vsAI) {
    //  vsFriend.style.background = Color.RED;
    //} else {
    //  vsAi.style.background = Color.RED;
    //}
    //changeSidesBtn.style.background = Color.RED;
    // place enemy's mark
    //if (!hasEnded() && gameMode === gameModes.vsAI) {
    //  getBestMove();
    //}
    // say that it is now user's turn
    //result.innerText = `${currChoice} turn`;
  }
  //displayResultText();
};

export default function Main() {
  const [board, setBoard] = useState<Board>([
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
  ]);

  return (
    <div className={styles["center-container"]}>
      <div className={styles.main}>
        <div className={styles.board}>
          {board.map((cell, i) => (
            <Box content={cell} idx={i} board={board} setBoard={setBoard} />
          ))}
        </div>
        <div className={styles["result-container"]}>
          <div className={styles.result}>X turn</div>
        </div>
      </div>
      <div className={styles.right}>
        <button className={styles["vs-friend"]}>Play vs friend</button>
        <button className={styles["vs-ai"]}>Play vs AI</button>
        <button className={styles["change-sides"]}>Change sides</button>
        <button className={styles.restart}>Restart</button>
      </div>
    </div>
  );
}

interface BoxProps {
  content: Choice;
  idx: number;
  board: Board;
  setBoard: (board: Board) => void;
}

function Box({ content, idx, board, setBoard }: BoxProps) {
  return (
    <div onClick={() => game(idx, board, setBoard)} className={styles.box}>
      {content}
    </div>
  );
}

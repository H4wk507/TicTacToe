import { useState } from "react";
import styles from "./style.module.scss";

//const Color = Object.freeze({
//  // other color formats do not work with comparison.
//  GREEN: "rgb(1, 121, 51)",
//  YELLOW: "rgb(204, 125, 0)",
//  RED: "rgb(130, 0, 0)",
//});

type Mode = "vsAI" | "vsFriend";
type Choice = "X" | "O";
type Square = Choice | null;
type Board = Square[];

const getEmptyBoard = (): Board => new Array(9).fill(null);

const hasTied = (board: Board): boolean => !board.includes(null);

const getWinner = (board: Board): Choice | null => {
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
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
};

const hasEnded = (board: Board): boolean =>
  hasTied(board) || getWinner(board) !== null;

function getBestMove(
  board: Board,
  setBoard: (board: Board) => void,
  currChoice: Choice,
) {
  /**
   * Check every possible available field, calculate value of the field,
   * and set the mark on the highest value field.
   */

  const enemyChoice = currChoice === "O" ? "X" : "O";
  const isMaximizing = enemyChoice === "X";
  const fakeBoard = [...board];
  let bestScore = isMaximizing ? -Infinity : Infinity;
  let bestMoveIdx: number | null = null;
  for (let i = 0; i < 9; i++) {
    // if the field is taken, continue
    if (fakeBoard[i]) continue;

    // place the mark on the board
    fakeBoard[i] = enemyChoice;
    /* calculate the value of that placement, assuming the other player
       is playing optimally. */
    const currScore = minimax(!isMaximizing, fakeBoard);
    // remove the mark from the board
    fakeBoard[i] = null;

    // if optimal placement was found, save it and get its index
    if (
      (enemyChoice === "O" && currScore < bestScore) ||
      (enemyChoice === "X" && currScore > bestScore)
    ) {
      bestScore = currScore;
      bestMoveIdx = i;
    }
  }

  // after checking every field, place the mark on the optimal position
  if (bestMoveIdx !== null) {
    setBoard(board.map((cell, i) => (i === bestMoveIdx ? enemyChoice : cell)));
  }
  // document.getElementById(fields[bestMoveIdx]).innerText = enemyChoice;
  // document.getElementById(fields[bestMoveIdx]).style.background = Color.RED;
}

function minimax(isMaximizing: boolean, board: Board) {
  if (hasEnded(board)) {
    const result = getWinner(board);
    if (!result) return 0; // TIE
    return result === "X" ? 1 : -1;
  }

  let bestScore = isMaximizing ? -Infinity : Infinity;
  const choice = isMaximizing ? "X" : "O";
  for (let i = 0; i < 9; i++) {
    // if the field is taken, continue
    if (board[i]) continue;

    board[i] = choice;
    const score = minimax(!isMaximizing, board);
    board[i] = null;
    bestScore = isMaximizing
      ? Math.max(bestScore, score)
      : Math.min(bestScore, score);
  }

  return bestScore;
}

const placeMark = (
  idx: number,
  board: Board,
  setBoard: (board: Board) => void,
  currChoice: Choice,
  setCurrChoice: (currChoice: Choice) => void,
  mode: Mode,
): void => {
  if (hasEnded(board) || board[idx]) return;
  const newBoard = board.map((cell, i) => (i === idx ? currChoice : cell));
  setBoard(newBoard);
  if (mode === "vsAI") {
    getBestMove(newBoard, setBoard, currChoice);
  } else {
    setCurrChoice(currChoice === "O" ? "X" : "O");
  }
};

const getResultText = (board: Board): string => {
  const winner = getWinner(board);
  return winner ? `${winner} wins!` : "Tie!";
};

export default function Main() {
  const [board, setBoard] = useState<Board>(getEmptyBoard());
  const [mode, setMode] = useState<Mode>("vsFriend");
  const [currChoice, setCurrChoice] = useState<Choice>("O");

  const resultText = hasEnded(board)
    ? getResultText(board)
    : `${currChoice} turn`;

  return (
    <div className={styles["center-container"]}>
      <div className={styles.main}>
        <div className={styles.board}>
          {board.map((cell, i) => (
            <Box
              key={i}
              content={cell}
              idx={i}
              board={board}
              setBoard={setBoard}
              currChoice={currChoice}
              setCurrChoice={setCurrChoice}
              mode={mode}
            />
          ))}
        </div>
        <div className={styles["result-container"]}>
          <div className={styles.result}>{resultText}</div>
        </div>
      </div>
      <div className={styles.right}>
        <button
          onClick={() => {
            setMode("vsFriend");
            setBoard(getEmptyBoard());
          }}
          className={`${mode === "vsFriend" ? styles.active : styles.inactive}`}
        >
          Play vs friend
        </button>
        <button
          onClick={() => {
            setMode("vsAI");
            const newBoard = getEmptyBoard();
            setBoard(newBoard);
            //setCurrChoice("X");
            if (currChoice === "X") {
              getBestMove(newBoard, setBoard, currChoice);
            }
          }}
          className={`${mode === "vsAI" ? styles.active : styles.inactive}`}
        >
          Play vs AI
        </button>
        <button
          className={styles.inactive}
          onClick={() => {
            const newBoard = getEmptyBoard();
            const newChoice = currChoice === "O" ? "X" : "O";
            setBoard(newBoard);
            setCurrChoice(newChoice);
            if (mode === "vsAI" && newChoice === "X") {
              getBestMove(newBoard, setBoard, newChoice);
            }
          }}
        >
          Change sides
        </button>
        <button
          className={styles.inactive}
          onClick={() => {
            const newBoard = getEmptyBoard();
            setBoard(getEmptyBoard());
            if (mode === "vsAI" && currChoice === "X") {
              getBestMove(newBoard, setBoard, currChoice);
            }
          }}
        >
          Restart
        </button>
      </div>
    </div>
  );
}

interface BoxProps {
  content: Square;
  idx: number;
  board: Board;
  setBoard: (board: Board) => void;
  currChoice: Choice;
  setCurrChoice: (currChoice: Choice) => void;
  mode: Mode;
}

function Box({
  content,
  idx,
  board,
  setBoard,
  currChoice,
  setCurrChoice,
  mode,
}: BoxProps) {
  return (
    <div
      onClick={() =>
        placeMark(idx, board, setBoard, currChoice, setCurrChoice, mode)
      }
      id={idx.toString()}
      className={styles.box}
    >
      {content}
    </div>
  );
}

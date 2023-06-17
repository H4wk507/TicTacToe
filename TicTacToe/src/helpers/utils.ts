import { TBoard, Choice } from "./types";

export const getEmptyBoard = (): TBoard => new Array(9).fill(null);

export const hasEnded = (board: TBoard): boolean =>
  hasTied(board) || getWinner(board) !== null;

export const hasTied = (board: TBoard): boolean => !board.includes(null);

export const getWinner = (
  board: TBoard,
): { winner: Choice; line: [number, number, number] } | null => {
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
      return {
        winner: board[a] as Choice,
        line: [a, b, c],
      };
    }
  }
  return null;
};

export const getBestMove = (
  board: TBoard,
  currChoice: Choice,
): number | null => {
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

  return bestMoveIdx;
};

export const minimax = (isMaximizing: boolean, board: TBoard) => {
  if (hasEnded(board)) {
    const winner = getWinner(board);
    if (winner === null) {
      return 0;
    }
    return winner.winner === "X" ? 1 : -1;
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
};

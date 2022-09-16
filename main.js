const choices = ["X", "O"];
const fields = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

const board = ["", "", "", "", "", "", "", "", ""];

const scores = {
  X: 1,
  O: -1,
  tie: 0,
};

const meStart = true;
let userChoice = choices[0];

function fillBoard(field, board) {
  let idx = fields.indexOf(field);
  if (idx !== -1) board[idx] = "X";
}

function isTie(board) {
  /**
   * The game is tied only if every field is occupied.
   *
   * @return {Boolean} Whether the game has tied or not.
   */
  for (let i = 0; i < 9; i++) {
    if (board[i] === "") return false;
  }
  return true;
}

function checkWinner(board) {
  /**
   * If the game has ended, change result text.
   *
   * @return {Boolean} Whether a game has ended or not.
   */
  if (!isOver(board)) return false;

  if (isOver(board) === "O")
    document.querySelector(".result").innerText = "You lose!";
  else if (isOver(board) === "X")
    document.querySelector(".result").innerText = "You win!";
  else document.querySelector(".result").innerText = "Tie!";

  return true;
}

function isOver(board) {
  /**
   * If the game has ended, return the winner i.e. 'X' or 'O' or 'tie' if it has tied.
   * Otherwise return false.
   */

  /* vertical */
  for (let i = 0; i < 3; i++) {
    if (
      board[i] !== "" &&
      board[i] === board[i + 3] &&
      board[i + 3] === board[i + 6]
    )
      return board[i];
  }

  /* horizontal */
  for (let i = 0; i < 9; i += 3) {
    if (
      board[i] !== "" &&
      board[i] === board[i + 1] &&
      board[i + 1] === board[i + 2]
    )
      return board[i];
  }

  /* main diagonal */
  if (board[0] !== "" && board[0] === board[4] && board[4] === board[8])
    return board[0];

  /* second diagonal */
  if (board[2] !== "" && board[2] === board[4] && board[4] === board[6])
    return board[2];

  if (isTie(board)) return "tie";

  return false;
}

function minimax(board, isMaximizing) {
  if (isOver(board)) {
    let result = isOver(board);
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] == "") {
        board[i] = "X";
        let score = minimax(board, false);
        board[i] = "";
        bestScore = Math.max(bestScore, score);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i] == "") {
        board[i] = "O";
        let score = minimax(board, true);
        board[i] = "";
        bestScore = Math.min(bestScore, score);
      }
    }
    return bestScore;
  }
}

function getBestMove(board) {
  /**
   * Check every possible available field, calculate value of the field,
   * and set choice on the highest value field.
   *
   * @return {void}
   */

  let bestScore = Infinity;
  let bestMoveIdx = -1;
  for (let i = 0; i < 9; i++) {
    // if the field is taken, continue
    if (board[i] !== "") continue;

    board[i] = "O";
    const currScore = minimax(board, true);
    board[i] = "";

    if (currScore < bestScore) {
      bestScore = currScore;
      bestMoveIdx = i;
    }
  }
  board[bestMoveIdx] = "O";
  document.getElementById(fields[bestMoveIdx]).innerText = "O";
}

function game(field, board) {
  /**
   * Place user choice at the 'field' in the 'board'.
   *
   * @param {String} field field from 'one' to 'nine'.
   * @return {void}
   */
  let over = checkWinner(board);
  if (!over) {
    if (document.getElementById(field).innerText === "") {
      document.getElementById(field).innerText = "X";
      fillBoard(field, board);
      over = checkWinner(board);
      if (!over) getBestMove(board);
      checkWinner(board);
    }
  }
}

function resetBoard(board) {
  // reset board
  board.fill("");
  fields.forEach((field) => (document.getElementById(field).innerText = ""));

  // generate best AI move and switch text to your turn.
  if (!meStart) getBestMove(board);
  document.querySelector(".result").innerText = "X turn";
}

function changeSides() {
  resetBoard(board);
}

function main() {
  if (!meStart) getBestMove(board);

  fields.forEach((field) =>
    document
      .getElementById(field)
      .addEventListener("click", () => game(field, board)),
  );

  document
    .querySelector(".restart")
    .addEventListener("click", () => resetBoard(board));

  document
    .querySelector(".change-sides")
    .addEventListener("click", () => changeSides());
}

main();

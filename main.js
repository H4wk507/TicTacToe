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

let meStart = false;
let userChoice = choices[0];
let enemyChoice = choices[1];

function fillBoard(field) {
  document.getElementById(field).innerText = userChoice;

  const idx = fields.indexOf(field);
  if (idx !== -1) board[idx] = userChoice;
}

function isTie() {
  /**
   * The game is tied only if every field is occupied.
   *
   * @return {Boolean} Whether the game has tied or not.
   */

  for (let field of board) {
    if (field === "") return false;
  }
  return true;
}

function hasEnded() {
  return getGameState() !== "";
}

function displayResultText() {
  /**
   * If the game has ended, change the result text.
   *
   * @return {void}
   */

  const gameState = getGameState();
  if (gameState === "") return;

  if (gameState === enemyChoice)
    document.querySelector(".result").innerText = "You lose!";
  else if (gameState === userChoice)
    document.querySelector(".result").innerText = "You win!";
  else document.querySelector(".result").innerText = "Tie!";
}

function getGameState() {
  /**
   * If the game has ended, return the winner i.e. 'X' or 'O' or 'tie' if it has tied.
   * Otherwise return "".
   *
   * @return {String}
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

  if (isTie()) return "tie";

  return "";
}

function minimax(isMaximizing) {
  if (getGameState() !== "") {
    const result = getGameState();
    return scores[result];
  }

  let bestScore = isMaximizing ? -Infinity : Infinity;
  for (let i = 0; i < 9; i++) {
    // if the field is taken, continue
    if (board[i] !== "") continue;

    board[i] = isMaximizing ? "X" : "O";
    const score = minimax(!isMaximizing);
    board[i] = "";
    bestScore = isMaximizing
      ? Math.max(bestScore, score)
      : Math.min(bestScore, score);
  }

  return bestScore;
}

function getBestMove() {
  /**
   * Check every possible available field, calculate value of the field,
   * and set the mark on the highest value field.
   *
   * @return {void}
   */

  const isMaximizing = enemyChoice === "X";
  let bestScore = isMaximizing ? -Infinity : Infinity;
  let bestMoveIdx = -1;

  for (let i = 0; i < 9; i++) {
    // if the field is taken, continue
    if (board[i] !== "") continue;

    // place the mark on the board
    board[i] = enemyChoice;
    /* calculate the value of that placement, assuming the other player
       is playing optimally. */
    const currScore = minimax(!isMaximizing);
    // remove the mark from the board
    board[i] = "";

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
  board[bestMoveIdx] = enemyChoice;
  document.getElementById(fields[bestMoveIdx]).innerText = enemyChoice;
}

function game(field) {
  /**
   * Place user mark at the 'field' in the 'board'.
   *
   * @param {String} field field from 'one' to 'nine'.
   * @return {void}
   */

  if (!hasEnded()) {
    // if the field is already occupied, return
    if (document.getElementById(field).innerText !== "") return;

    fillBoard(field);
    if (!hasEnded()) getBestMove();
  }

  displayResultText();
}

function resetBoard() {
  board.fill("");
  fields.forEach((field) => (document.getElementById(field).innerText = ""));

  // generate best AI move and switch text to your turn.
  if (!meStart) getBestMove();
  document.querySelector(".result").innerText = "X turn";
}

function changeSides() {
  meStart = !meStart;
  [userChoice, enemyChoice] = [enemyChoice, userChoice];
  resetBoard();
}

function main() {
  if (!meStart) getBestMove();

  fields.forEach((field) =>
    document.getElementById(field).addEventListener("click", () => game(field)),
  );

  document
    .querySelector(".restart")
    .addEventListener("click", () => resetBoard());

  document
    .querySelector(".change-sides")
    .addEventListener("click", () => changeSides());
}

main();

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
  TIE: 0,
};

const Color = Object.freeze({
  GREEN: "rgb(1, 121, 51)",
  YELLOW: "rgb(204, 112, 0)",
  RED: "rgb(172, 0, 0)",
});

const gameModes = Object.freeze({
  vsAI: Symbol("vsAI"),
  vsFriend: Symbol("vsFriend"),
});
let gameMode = gameModes.vsAI;

let userChoice = choices[0];
let enemyChoice = choices[1];
let currChoice = choices[1];
let meStart = userChoice === "O";

function fillBoard(field) {
  /**
   * Fill the 'board' variable and HTML board with 'currChoice' choice.
   *
   * @return {void}
   */

  document.getElementById(field).innerText = currChoice;
  document.getElementById(field).style.backgroundColor = Color.RED;

  const idx = fields.indexOf(field);
  if (idx !== -1) {
    board[idx] = currChoice;
  }
}

function hasTied() {
  /**
   * The game has tied only if every field is occupied.
   *
   * @return {Boolean} true if the game has tied, false otherwise.
   */

  for (let field of board) {
    if (field === "") return false;
  }

  return true;
}

function hasEnded() {
  /**
   * Check if the game has ended.
   *
   * @return {Boolean} true if the game has ended, false otherwise.
   */

  return getGameState() !== "";
}

function displayResultText() {
  /**
   * If the game has ended, change the result text.
   *
   * @return {void}
   */

  if (!hasEnded()) return;

  const gameState = getGameState(true);
  if (gameState === enemyChoice) {
    document.querySelector(".result").innerText = `${enemyChoice} wins!`;
  } else if (gameState === userChoice) {
    document.querySelector(".result").innerText = `${userChoice} wins!`;
  } else {
    document.querySelector(".result").innerText = "Tie!";
  }
}

function getGameState(color = false) {
  /**
   * If the game has ended, return the winner.
   *
   * @param {Boolean} color if set to true, color the winning fields green.
   * @return {String} winner: 'X, 'O', 'TIE' or "" if no winner.
   */

  /* vertical */
  for (let i = 0; i < 3; i++) {
    if (
      board[i] !== "" &&
      board[i] === board[i + 3] &&
      board[i + 3] === board[i + 6]
    ) {
      if (color) {
        document.getElementById(fields[i]).style.backgroundColor = Color.GREEN;
        document.getElementById(fields[i + 3]).style.backgroundColor =
          Color.GREEN;
        document.getElementById(fields[i + 6]).style.backgroundColor =
          Color.GREEN;
      }
      return board[i];
    }
  }

  /* horizontal */
  for (let i = 0; i < 9; i += 3) {
    if (
      board[i] !== "" &&
      board[i] === board[i + 1] &&
      board[i + 1] === board[i + 2]
    ) {
      if (color) {
        document.getElementById(fields[i]).style.backgroundColor = Color.GREEN;
        document.getElementById(fields[i + 1]).style.backgroundColor =
          Color.GREEN;
        document.getElementById(fields[i + 2]).style.backgroundColor =
          Color.GREEN;
      }
      return board[i];
    }
  }

  /* main diagonal */
  if (board[0] !== "" && board[0] === board[4] && board[4] === board[8]) {
    if (color) {
      document.getElementById(fields[0]).style.backgroundColor = Color.GREEN;
      document.getElementById(fields[4]).style.backgroundColor = Color.GREEN;
      document.getElementById(fields[8]).style.backgroundColor = Color.GREEN;
    }
    return board[0];
  }

  /* second diagonal */
  if (board[2] !== "" && board[2] === board[4] && board[4] === board[6]) {
    if (color) {
      document.getElementById(fields[2]).style.backgroundColor = Color.GREEN;
      document.getElementById(fields[4]).style.backgroundColor = Color.GREEN;
      document.getElementById(fields[6]).style.backgroundColor = Color.GREEN;
    }
    return board[2];
  }

  if (hasTied()) return "TIE";

  return "";
}

function minimax(isMaximizing) {
  /**
   *
   * @param {Boolean} isMaximizing
   * @return {int}
   */

  if (hasEnded()) {
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
  document.getElementById(fields[bestMoveIdx]).style.backgroundColor =
    Color.RED;
  changeMark();
}

function changeMark() {
  const idx = choices.indexOf(currChoice);
  currChoice = choices[idx ^ 1];
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

    // place user's mark
    fillBoard(field);
    changeMark();
    if (gameMode === gameModes.vsAI) {
      document.querySelector(".vs-friend").style.backgroundColor = Color.RED;
    } else {
      document.querySelector(".vs-ai").style.backgroundColor = Color.RED;
    }
    document.querySelector(".change-sides").style.backgroundColor = Color.RED;
    // place enemy's mark
    if (!hasEnded() && gameMode === gameModes.vsAI) {
      getBestMove();
    }
    // say that it is now user's turn
    document.querySelector(".result").innerText = `${currChoice} turn`;
  }
  displayResultText();
}

function playVsFriend() {
  if (
    document.querySelector(".vs-friend").style.backgroundColor === Color.YELLOW
  ) {
    document.querySelector(".vs-friend").style.backgroundColor = Color.GREEN;
    document.querySelector(".vs-ai").style.backgroundColor = Color.YELLOW;

    gameMode = gameModes.vsFriend;
    resetBoard();
  }
}

function playVsAI() {
  if (document.querySelector(".vs-ai").style.backgroundColor === Color.YELLOW) {
    document.querySelector(".vs-friend").style.backgroundColor = Color.YELLOW;
    document.querySelector(".vs-ai").style.backgroundColor = Color.GREEN;

    gameMode = gameModes.vsAI;
    resetBoard();
  }
}

function resetBoard() {
  board.fill("");
  fields.forEach((field) => {
    document.getElementById(field).innerText = "";
    document.getElementById(field).style.backgroundColor = "";
  });

  currChoice = "O";

  // generate best AI move
  if (!meStart && gameMode === gameModes.vsAI) {
    getBestMove();
  }

  document.querySelector(".result").innerText = `${currChoice} turn`;
  document.querySelector(".change-sides").style.backgroundColor = Color.YELLOW;
  document.querySelector(
    gameMode === gameModes.vsAI ? ".vs-friend" : ".vs-ai",
  ).style.backgroundColor = Color.YELLOW;
}

function changeSides() {
  if (
    document.querySelector(".change-sides").style.backgroundColor ===
    Color.YELLOW
  ) {
    meStart = !meStart;
    [userChoice, enemyChoice] = [enemyChoice, userChoice];
    resetBoard();
  }
}

function main() {
  if (!meStart) {
    getBestMove();
  }

  document.querySelector(".vs-friend").style.backgroundColor = Color.YELLOW;
  document.querySelector(".vs-ai").style.backgroundColor = Color.GREEN;
  document.querySelector(".change-sides").style.backgroundColor = Color.YELLOW;
  document.querySelector(".restart").style.backgroundColor = Color.YELLOW;

  fields.forEach((field) =>
    document.getElementById(field).addEventListener("click", () => game(field)),
  );

  document.querySelector(".vs-friend").addEventListener("click", playVsFriend);
  document.querySelector(".vs-ai").addEventListener("click", playVsAI);

  document
    .querySelector(".change-sides")
    .addEventListener("click", changeSides);

  document.querySelector(".restart").addEventListener("click", resetBoard);
}

main();

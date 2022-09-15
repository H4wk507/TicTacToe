const choices = ["X", "O"];
const board = [
  ["", "", ""],
  ["", "", ""],
  ["", "", ""],
];

function fillBoard(field, board) {
  switch (field) {
    case "one":
      board[0][0] = "X";
      break;
    case "two":
      board[0][1] = "X";
      break;
    case "three":
      board[0][2] = "X";
      break;
    case "four":
      board[1][0] = "X";
      break;
    case "five":
      board[1][1] = "X";
      break;
    case "six":
      board[1][2] = "X";
      break;
    case "seven":
      board[2][0] = "X";
      break;
    case "eight":
      board[2][1] = "X";
      break;
    case "nine":
      board[2][2] = "X";
      break;
  }
}

function boardToHTML(i, j) {
  if (i == 0 && j == 0) document.getElementById("one").innerHTML = "O";
  if (i == 0 && j == 1) document.getElementById("two").innerHTML = "O";
  if (i == 0 && j == 2) document.getElementById("three").innerHTML = "O";
  if (i == 1 && j == 0) document.getElementById("four").innerHTML = "O";
  if (i == 1 && j == 1) document.getElementById("five").innerHTML = "O";
  if (i == 1 && j == 2) document.getElementById("six").innerHTML = "O";
  if (i == 2 && j == 0) document.getElementById("seven").innerHTML = "O";
  if (i == 2 && j == 1) document.getElementById("eight").innerHTML = "O";
  if (i == 2 && j == 2) document.getElementById("nine").innerHTML = "O";
}

function isTie(board) {
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] === "") return false;
    }
  }
  return true;
}

function checkWinner(board, over) {
  if (isOver(board) !== null) {
    if (isOver(board) === "O") {
      document.querySelector(".result").innerHTML = "Przegrales";
    } else if (isOver(board) === "X") {
      document.querySelector(".result").innerHTML = "Wygrales";
    } else {
      document.querySelector(".result").innerHTML = "Remis";
    }
    over = true;
    return over;
  }
  return false;
}

function isOver(board) {
  if (
    board[0][0] === board[0][1] &&
    board[0][1] === board[0][2] &&
    board[0][0] != ""
  ) {
    if (board[0][0] === "X") return "X";
    else return "O";
  }

  if (
    board[1][0] === board[1][1] &&
    board[1][1] === board[1][2] &&
    board[1][0] !== ""
  ) {
    if (board[1][0] === "X") return "X";
    else return "O";
  }

  if (
    board[2][0] === board[2][1] &&
    board[2][1] === board[2][2] &&
    board[2][0] !== ""
  ) {
    if (board[2][0] === "X") return "X";
    else return "O";
  }

  if (
    board[0][0] === board[1][0] &&
    board[1][0] === board[2][0] &&
    board[0][0] !== ""
  ) {
    if (board[0][0] === "X") return "X";
    else return "O";
  }

  if (
    board[0][1] === board[1][1] &&
    board[1][1] === board[2][1] &&
    board[0][1] !== ""
  ) {
    if (board[0][1] === "X") return "X";
    else return "O";
  }

  if (
    board[0][2] === board[1][2] &&
    board[1][2] === board[2][2] &&
    board[0][2] !== ""
  ) {
    if (board[0][2] === "X") return "X";
    else return "O";
  }

  if (
    board[0][0] === board[1][1] &&
    board[1][1] === board[2][2] &&
    board[0][0] !== ""
  ) {
    if (board[0][0] === "X") return "X";
    else return "O";
  }

  if (
    board[0][2] === board[1][1] &&
    board[1][1] === board[2][0] &&
    board[0][2] !== ""
  ) {
    if (board[0][2] === "X") return "X";
    else return "O";
  }

  if (isTie(board)) {
    return "tie";
  }
  return null;
}

const scores = {
  X: 1,
  O: -1,
  tie: 0,
};

function minimax(board, depth, isMaximizing) {
  if (isOver(board) !== null) {
    let result = isOver(board);
    return scores[result];
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          board[i][j] = "X";
          let score = minimax(board, depth + 1, false);
          board[i][j] = "";
          bestScore = Math.max(bestScore, score);
        }
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (board[i][j] == "") {
          board[i][j] = "O";
          let score = minimax(board, depth + 1, true);
          board[i][j] = "";
          bestScore = Math.min(bestScore, score);
        }
      }
    }
    return bestScore;
  }
}

function getBestMove(board) {
  /* check every possible available field, 
    calculate value of the field, and return 
    the highest value.
    */

  let bestScore = Infinity;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      // is field not taken?
      if (board[i][j] == "") {
        board[i][j] = "O";
        let score = minimax(board, 0, true);
        board[i][j] = "";
        if (score < bestScore) {
          bestScore = score;
          var bestMove1 = i;
          var bestMove2 = j;
        }
      }
    }
  }
  board[bestMove1][bestMove2] = "O";
  boardToHTML(bestMove1, bestMove2);
}

function game(field, board, over) {
  over = checkWinner(board);
  if (!over) {
    if (document.getElementById(field).innerHTML === "") {
      document.getElementById(field).innerHTML = "X";
      fillBoard(field, board);
      checkWinner(board, over);
      getBestMove(board);
      checkWinner(board, over);
    }
  }
}

function resetBoard(board) {
  for (let row of board) row.fill("");

  const options = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
  for (let option of options)
    document.getElementById(option).innerText = "";
  getBestMove(board);
  document.querySelector(".result").innerText = "X turn";
}

function main() {
  getBestMove(board);
  document
    .getElementById("one")
    .addEventListener("click", () => game("one", board));
  document
    .getElementById("two")
    .addEventListener("click", () => game("two", board));
  document
    .getElementById("three")
    .addEventListener("click", () => game("three", board));
  document
    .getElementById("four")
    .addEventListener("click", () => game("four", board));
  document
    .getElementById("five")
    .addEventListener("click", () => game("five", board));
  document
    .getElementById("six")
    .addEventListener("click", () => game("six", board));
  document
    .getElementById("seven")
    .addEventListener("click", () => game("seven", board));
  document
    .getElementById("eight")
    .addEventListener("click", () => game("eight", board));
  document
    .getElementById("nine")
    .addEventListener("click", () => game("nine", board));

  const restartButton = document.querySelector(".restart");
  restartButton.addEventListener("click", () => resetBoard(board));
}

main();

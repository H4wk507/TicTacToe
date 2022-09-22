(function () {
  const choices = ["X", "O"];
  const board = ["", "", "", "", "", "", "", "", ""];
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
  const scores = {
    X: 1,
    O: -1,
    TIE: 0,
  };

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
  let currChoice = choices[1];
  let meStart = userChoice === "O";

  const result = document.querySelector(".result");
  const vsFriend = document.querySelector(".vs-friend");
  const vsAi = document.querySelector(".vs-ai");
  const changeSidesBtn = document.querySelector(".change-sides");
  const restart = document.querySelector(".restart");

  function fillBoard(field) {
    /**
     * Fill the 'board' variable and HTML board with 'currChoice' choice.
     *
     * @return {void}
     */

    const fieldBox = document.getElementById(field);
    fieldBox.innerText = currChoice;
    fieldBox.style.background = Color.RED;

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
      result.innerText = `${enemyChoice} wins!`;
    } else if (gameState === userChoice) {
      result.innerText = `${userChoice} wins!`;
    } else {
      result.innerText = "Tie!";
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
          document.getElementById(fields[i]).style.background = Color.GREEN;
          document.getElementById(fields[i + 3]).style.background = Color.GREEN;
          document.getElementById(fields[i + 6]).style.background = Color.GREEN;
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
          document.getElementById(fields[i]).style.background = Color.GREEN;
          document.getElementById(fields[i + 1]).style.background = Color.GREEN;
          document.getElementById(fields[i + 2]).style.background = Color.GREEN;
        }
        return board[i];
      }
    }

    /* main diagonal */
    if (board[0] !== "" && board[0] === board[4] && board[4] === board[8]) {
      if (color) {
        document.getElementById(fields[0]).style.background = Color.GREEN;
        document.getElementById(fields[4]).style.background = Color.GREEN;
        document.getElementById(fields[8]).style.background = Color.GREEN;
      }
      return board[0];
    }

    /* second diagonal */
    if (board[2] !== "" && board[2] === board[4] && board[4] === board[6]) {
      if (color) {
        document.getElementById(fields[2]).style.background = Color.GREEN;
        document.getElementById(fields[4]).style.background = Color.GREEN;
        document.getElementById(fields[6]).style.background = Color.GREEN;
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
    document.getElementById(fields[bestMoveIdx]).style.background = Color.RED;
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
        vsFriend.style.background = Color.RED;
      } else {
        vsAi.style.background = Color.RED;
      }
      changeSidesBtn.style.background = Color.RED;
      // place enemy's mark
      if (!hasEnded() && gameMode === gameModes.vsAI) {
        getBestMove();
      }
      // say that it is now user's turn
      result.innerText = `${currChoice} turn`;
    }
    displayResultText();
  }

  function playVsFriend() {
    if (vsFriend.style.background === Color.YELLOW) {
      vsFriend.style.background = Color.GREEN;
      vsAi.style.background = Color.YELLOW;

      gameMode = gameModes.vsFriend;
      resetBoard();
    }
  }

  function playVsAI() {
    if (vsAi.style.background === Color.YELLOW) {
      vsFriend.style.background = Color.YELLOW;
      vsAi.style.background = Color.GREEN;

      gameMode = gameModes.vsAI;
      resetBoard();
    }
  }

  function resetBoard() {
    board.fill("");
    fields.forEach((field) => {
      document.getElementById(field).innerText = "";
      document.getElementById(field).style.background = "";
    });

    currChoice = "O";

    // generate best AI move
    if (!meStart && gameMode === gameModes.vsAI) {
      getBestMove();
    }

    result.innerText = `${currChoice} turn`;
    changeSidesBtn.style.background = Color.YELLOW;
    if (gameMode === gameModes.vsAI) {
      vsFriend.style.background = Color.YELLOW;
    } else {
      vsAi.style.background = Color.YELLOW;
    }
  }

  function changeSides() {
    if (changeSidesBtn.style.background === Color.YELLOW) {
      meStart = !meStart;
      [userChoice, enemyChoice] = [enemyChoice, userChoice];
      resetBoard();
    }
  }

  function main() {
    if (!meStart) {
      getBestMove();
    }

    vsFriend.style.background = Color.YELLOW;
    vsAi.style.background = Color.GREEN;
    changeSidesBtn.style.background = Color.YELLOW;
    restart.style.background = Color.YELLOW;

    fields.forEach((field) =>
      document
        .getElementById(field)
        .addEventListener("click", () => game(field)),
    );

    vsFriend.addEventListener("click", playVsFriend);
    vsAi.addEventListener("click", playVsAI);
    changeSidesBtn.addEventListener("click", changeSides);
    restart.addEventListener("click", resetBoard);
  }

  main();
})();

document.addEventListener("DOMContentLoaded", function () {
    const squares = document.querySelectorAll("#board > div");
    const status = document.getElementById("status");
    const newGameButton = document.querySelector(".btn");
    let currentPlayer = "X";
    let gameBoard = ["", "", "", "", "", "", "", "", ""];
  
    // Function to check for a winner
    function checkWinner(player) {
      const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
      ];
  
      for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (
          gameBoard[a] === player &&
          gameBoard[b] === player &&
          gameBoard[c] === player
        ) {
          return true;
        }
      }
  
      return false;
    }
  
    // Function to handle square click
    function handleSquareClick(event) {
      const square = event.target;
      const index = Array.from(square.parentElement.children).indexOf(square);
  
      if (gameBoard[index] === "") {
        gameBoard[index] = currentPlayer;
        square.classList.add(currentPlayer);
        square.textContent = currentPlayer;
  
        if (checkWinner(currentPlayer)) {
          status.textContent = `Congratulations! ${currentPlayer} is the Winner!`;
          status.classList.add("you-won");
          currentPlayer = "";
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
      }
    }
  
    function resetGame() {
        squares.forEach((square) => {
          square.classList.remove("X", "O");
          square.textContent = "";
        });
      
        status.textContent = "Move your mouse over a square and click to play an X or an O.";
        status.classList.remove("you-won");
        currentPlayer = "X";
        gameBoard = ["", "", "", "", "", "", "", "", ""];
      }
      
  
    squares.forEach((square) => {
      square.addEventListener("click", handleSquareClick);
  
      square.addEventListener("mouseenter", function () {
        if (gameBoard[Array.from(square.parentElement.children).indexOf(square)] === "") {
          square.classList.add("hover");
        }
      });
  
      square.addEventListener("mouseleave", function () {
        square.classList.remove("hover");
      });
    });
  
    newGameButton.addEventListener("click", resetGame);
  });
  
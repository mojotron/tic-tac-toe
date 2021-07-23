"use strict";
// const boardFactory = function () {
//   const board = Array.from({ length: 9 }, () => null);
//   const printBoard = () => board.forEach((ele) => console.log(ele));
//   const boardFull = () => !board.includes(null);
//   const getMarketAt = function (i) {
//     if (i < 0 || i > 9) return;
//     return board[i];
//   };
//   const setMarkerAt = function (i, marker) {
//     if (i < 0 || i > 9) return;
//     board[i] = marker;
//   };
//   const winCheck = function (marker) {
//     const winnerLines = [
//       [0, 1, 2],
//       [3, 4, 5],
//       [6, 7, 8],
//       [0, 3, 6],
//       [1, 4, 7],
//       [2, 5, 8],
//       [0, 4, 8],
//       [2, 4, 6],
//     ];
//     for (let line of winnerLines) {
//       if (line.every((i) => getMarketAt(i) === marker)) return true;
//     }
//     return false;
//   };
//   return { printBoard, boardFull, getMarketAt, setMarkerAt, winCheck };
// };

// const playerFactory = function (nick, marker) {
//   const getNick = () => nick;
//   const getMarker = () => marker;
//   return { getNick, getMarker };
// };

// const aiPlayer = function () {
//   const { getNick, getMarker } = playerFactory("AI", "o");
//   return { getNick, getMarker };
// };

// (function () {
//   //DOM element selectors
//   const modal = document.querySelector(".new-game-select");
//   const newGameBtn = document.querySelector(".btn-new-game");
//   const newRoundBtn = document.querySelector(".btn-new-round");
//   //TODO AI btn
//   const squares = document.querySelectorAll(".board-square");
//   const left = document.querySelector(".left-player");
//   const right = document.querySelector(".right-player");
//   const scoreBoard = document.querySelector(".score-board");
//   const leftScore = document.querySelector(".left-score");
//   const rightScore = document.querySelector(".right-score");
//   //Variable declaration
//   let board = boardFactory();
//   const p1 = playerFactory("player1", "x");
//   const p2 = playerFactory("player2", "o");
//   let currentPlayer = p1;
//   let p1Score = 0;
//   let p2Score = 0;
//   //Helper functions
//   const swapPlayer = () => (currentPlayer = currentPlayer === p1 ? p2 : p1);

//   const currentPlayerEffect = function () {
//     if (currentPlayer === p1) {
//       left.classList.add("left-player-effect");
//       right.classList.remove("right-player-effect");
//     } else {
//       left.classList.remove("left-player-effect");
//       right.classList.add("right-player-effect");
//     }
//   };
//   const newBoard = function () {
//     board = boardFactory();
//     for (let square of squares) square.textContent = "";
//   };

//   const displayMsg = function (msg) {
//     const element = document.querySelector(".option-msg");
//     element.textContent = msg;
//   };
//   const setUpNewGame = function () {
//     modal.classList.add("hidden");
//     currentPlayerEffect();
//     newBoard();
//     p1Score = 0;
//     p2Score = 0;
//     scoreBoard.classList.add("none");
//   };
//   const setUpNewRound = function () {
//     modal.classList.add("hidden");
//     swapPlayer();
//     currentPlayerEffect();
//     newBoard();
//   };
//   const endRoundUpdate = function () {
//     scoreBoard.classList.remove("none");
//     leftScore.textContent = p1Score;
//     rightScore.textContent = p2Score;
//     newRoundBtn.classList.remove("none");
//     modal.classList.remove("hidden");
//   };
//   //Main game engine
//   const gameEngine = function (event) {
//     const targetSquare = event.target.dataset.square;
//     if (board.getMarketAt(targetSquare)) return; //Guard clause when square already selected
//     event.target.textContent = currentPlayer.getMarker(); //Display marker on the DOM board
//     board.setMarkerAt(targetSquare, currentPlayer.getMarker()); //Set marker to js board object
//     //Check for win
//     if (board.winCheck(currentPlayer.getMarker())) {
//       displayMsg(`${currentPlayer.getMarker().toUpperCase()} won the round!`);
//       currentPlayer === p1 ? p1Score++ : p2Score++;
//       endRoundUpdate();
//       return;
//     }
//     //Check for draw (map is full)
//     if (board.boardFull()) {
//       displayMsg(`draw`);
//       endRoundUpdate();
//       return;
//     }

//     //No win solution swap current player
//     swapPlayer();
//     currentPlayerEffect();
//     event.target.style.color = "rgba(0, 0, 0, 0.8)";
//   };
//   //Set event listener to DOM boar squares
//   for (let square of squares) {
//     square.addEventListener("click", (e) => gameEngine(e));
//     square.addEventListener("mouseenter", function (e) {
//       if (!board.getMarketAt(e.target.dataset.square)) {
//         e.target.style.color = "rgba(0, 0, 0, 0.35)";
//         e.target.textContent = currentPlayer.getMarker();
//       }
//     });
//     square.addEventListener("mouseleave", function (e) {
//       if (!board.getMarketAt(e.target.dataset.square)) {
//         e.target.textContent = "";
//       }
//     });
//   }

//   newGameBtn.addEventListener("click", setUpNewGame);
//   newRoundBtn.addEventListener("click", setUpNewRound);
// })();
///////////////////////////////////////////////
// MINIMAX
///////////////////////////////////////////////
const board = ["x", null, "o", null, "x", "o", null, null, "x"];
const winnerLines = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const boardFull = (board) => !board.includes(null);

const emptySpots = function (board) {
  return board
    .map((ele, i) => (ele === null ? i : ele))
    .filter((ele) => typeof ele === "number");
};

const checkForWin = function (marker, line, board) {
  return line.every((index) => board[index] === marker);
};
const evaluate = function (boardState) {
  //Evaluate bored in current state, look for maximizer or minimizer score
  //AI is a maximizer => marker o, player is minimizer => marker x
  for (let line of winnerLines) {
    if (checkForWin("x", line, boardState)) return 10;
    if (checkForWin("o", line, boardState)) return -10;
  }
  return 0;
};

const bestMove = function (boardState) {};

console.log(evaluate(board));
//evaluate test
console.log(evaluate(["x", "o", "o", null, "x", null, null, null, "x"]));
console.log(evaluate(["o", "o", "o", null, "x", "x", null, null, "x"]));
console.log(evaluate(["x", "o", "x", "o", "x", "x", "o", "x", "o"]));
//board full test
console.log(boardFull(["x", "o", "o", null, "x", null, null, null, "x"]));
console.log(boardFull(["o", "o", "o", null, "x", "x", null, null, "x"]));
console.log(boardFull(["x", "o", "x", "o", "x", "x", "o", "x", "o"]));
//empty spots test
console.log(emptySpots(["x", "o", "o", null, "x", null, null, null, "x"]));
console.log(emptySpots(["o", "o", "o", null, "x", "x", null, null, "x"]));
console.log(emptySpots(["x", "o", "x", "o", "x", "x", "o", "x", "o"]));

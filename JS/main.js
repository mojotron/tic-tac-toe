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
//Helper functions for development
//Print current state of the board
function printBoard(board) {
  let final = "";
  let i = 0;
  for (let row = 0; row < 3; row++) {
    let makeRow = "|";
    for (let ele = 0; ele < 3; ele++) {
      makeRow += `${board[i] ? board[i] : "_"}|`;
      i++;
    }
    final += makeRow + "\n";
  }
  console.log(final);
}
//Global Variables Players
const playerHuman = "x";
const playerAi = "o";
const board = [null, null, null, null, null, null, null, null, null];
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

//Minimax helper functions
const boardFull = (board) => !board.includes(null);

function evaluate(boardState) {
  for (let line of winnerLines) {
    //Check for winning lines of Human (maximizer)
    if (line.every((index) => boardState[index] === playerAi)) return 10;
    //Check for winning condition for AI (minimizer)
    if (line.every((index) => boardState[index] === playerHuman)) return -10;
  }
  return 0;
}

function availableMoves(boardState) {
  return boardState
    .map((ele, i) => (ele ? ele : i))
    .filter((ele) => typeof ele === "number");
}

function minimax(boardState, depth, maximizer) {
  //Check break condition for recursion
  const evalScore = evaluate(boardState);
  if (evalScore === 10 || evalScore === -10) return evalScore;
  if (boardFull(boardState)) return 0;
  const freeMoves = availableMoves(boardState);
  if (maximizer) {
    let bestMove = -1000;
    for (let move of freeMoves) {
      boardState[move] = playerAi;
      bestMove = Math.max(bestMove, minimax(boardState, depth + 1, !maximizer));
      boardState[move] = null;
    }
    return bestMove - depth;
  } else {
    let bestMove = 1000;
    for (let move of freeMoves) {
      boardState[move] = playerHuman;
      bestMove = Math.min(bestMove, minimax(boardState, depth + 1, !maximizer));
      boardState[move] = null;
    }
    return bestMove + depth;
  }
}

function findBestMove(boardState) {
  //keep track of best move and index of best move
  let bestValue = -1000;
  let bestMove;

  const freeMoves = availableMoves(boardState);
  for (let move of freeMoves) {
    //put marker to free spot on board(move)
    boardState[move] = playerAi;
    //call minimax algorithm and save value
    const curValue = minimax(boardState, 0, false);
    //undo marker and restore currentState
    boardState[move] = null;
    //compare current value of move to best move
    if (curValue > bestValue) {
      bestValue = curValue;
      bestMove = move;
    }
  }
  console.log(bestValue);
  return bestMove;
}

//Tests
const state1 = ["x", "o", "x", "o", "o", "x", null, null, null];
const state2 = ["o", null, "x", "x", null, "x", null, "o", "o"];
const state3 = ["o", null, "x", "x", null, null, "x", "o", "o"];
const state4 = ["x", "o", "x", "o", "o", "o", null, null, null];
const state5 = ["x", "o", "o", "o", "x", "x", null, null, "x"];
//Test boardFull
// console.log(boardFull(state1));
// console.log(boardFull(state2));
// console.log(boardFull(state3));
// console.log(boardFull(state4));
// console.log(boardFull(state5));
// console.log(boardFull(["x", "o", "o", "o", "x", "x", "o", "x", "x"]));
//Test evaluate function
// console.log(evaluate(state1));
// console.log(evaluate(state2));
// console.log(evaluate(state3));
// console.log(evaluate(state4));
// console.log(evaluate(state5));
//Test availableMoves
// console.log(availableMoves(board));
// console.log(availableMoves(state1));
// console.log(availableMoves(state2));
// console.log(availableMoves(state3));
// console.log(availableMoves(state4));
// console.log(availableMoves(state5));
//Test minimax
// console.log(
//   minimax(["o", null, "x", "x", null, "x", null, "o", "o"], 0, false)
// );
// console.log(findBestMove(board));
//Test findBestMove
// findBestMove(state1);
while (!boardFull(board)) {
  printBoard(board);
  console.log("-------------");
  const player = Number(prompt("Input number")) - 1;
  board[player] = playerHuman;
  const aiMove = findBestMove(board);
  board[aiMove] = playerAi;
}
console.log(board);

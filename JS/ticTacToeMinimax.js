"use strict";
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
  return bestMove;
}
function checkWin(boardState, marker) {
  for (let lines of winnerLines) {
    if (lines.every((index) => boardState[index] === marker)) return true;
  }
  return false;
}
//test Play vs AI
//enter numbers from 1-9 to put market
while (!boardFull(board)) {
  printBoard(board);

  const player = Number(prompt("Input number")) - 1;
  board[player] = playerHuman;
  if (checkWin(board, playerHuman)) {
    console.log("You won");
    break;
  }
  const aiMove = findBestMove(board);
  board[aiMove] = playerAi;
  if (checkWin(board, playerAi)) {
    console.log("AI won");
    break;
  }
  console.log("-------------");
}
if (boardFull(board)) {
  printBoard(board);
  console.log("Draw");
} else {
  printBoard(board);
}

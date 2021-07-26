"use strict";
const boardFactory = function () {
  const board = Array.from({ length: 9 }, () => null);
  const printBoard = () => board.forEach((ele) => console.log(ele));
  const boardFull = () => !board.includes(null);
  const getMarketAt = function (i) {
    if (i < 0 || i > 9) return;
    return board[i];
  };
  const setMarkerAt = function (i, marker) {
    if (i < 0 || i > 9) return;
    board[i] = marker;
  };
  const winCheck = function (marker) {
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
    for (let line of winnerLines) {
      if (line.every((i) => getMarketAt(i) === marker)) return true;
    }
    return false;
  };
  return { printBoard, boardFull, getMarketAt, setMarkerAt, winCheck };
};

const playerFactory = function (nick, marker) {
  const getNick = () => nick;
  const getMarker = () => marker;
  return { getNick, getMarker };
};

const aiPlayer = function () {
  const { getNick, getMarker } = playerFactory("AI", "o");
  return { getNick, getMarker };
};
(function () {
  //TIC TAC TOE MODULE
  //DOM selectors
  const modal = document.querySelector(".new-game-select");
  const newGame = document.querySelector(".btn-new-game");
  const newGameAI = document.querySelector(".btn-ai-game");
  const newRound = document.querySelector(".btn-new-round");
  const squares = document.querySelectorAll(".board-square");
  const left = document.querySelector(".left-player");
  const right = document.querySelector(".right-player");
  const scoreBoard = document.querySelector(".score-board");
  const leftScore = document.querySelector(".left-score");
  const rightScore = document.querySelector(".right-score");
  //game state variables
  let board;
  let p1;
  let p2;
  let currentPlayer;
  let p1Score;
  let p2Score;
  let currentMode;
  //Set up start of game state depending on option
  const newBoard = function () {
    board = boardFactory();
    for (let square of squares) square.textContent = "";
  };
  const currentPlayerEffect = function () {
    if (currentPlayer === p1) {
      left.classList.add("left-player-effect");
      right.classList.remove("right-player-effect");
    } else {
      left.classList.remove("left-player-effect");
      right.classList.add("right-player-effect");
    }
  };
  const swapPlayer = () => (currentPlayer = currentPlayer === p1 ? p2 : p1);
  const displayMsg = function (msg) {
    const element = document.querySelector(".option-msg");
    element.textContent = msg;
  };
  const endRoundUpdate = function () {
    scoreBoard.classList.remove("none");
    leftScore.textContent = p1Score;
    rightScore.textContent = p2Score;
    newRoundBtn.classList.remove("none");
    modal.classList.remove("hidden");
  };
  function setUpNew(p1nick, p1marker, p2nick, p2marker) {
    modal.classList.add("hidden");
    newBoard();
    p1 = playerFactory(p1nick, p1marker);
    p2 = playerFactory(p2nick, p2marker);
    currentPlayer = p1;
    p1Score = 0;
    p2Score = 0;
  }
  function setUpNewAI(p1nick, p1marker, p2nick, p2marker) {
    setUpNew(p1nick, p1marker, p2nick, p2marker);
    p2 = aiPlayer(p2nick, p2marker);
  }
  function setUpNewRound() {}
  newGame.addEventListener("click", () =>
    setUpNew("player1", "x", "player2", "o")
  );
  newGameAI.addEventListener("click", () =>
    setUpNewAI("player1", "x", "AI", "o")
  );
  newRound.addEventListener("click", () => setUpNew());

  function gameEnginePvP(event) {
    const targetSquare = event.target.dataset.square;
    //check if board element marked
    //check for win condition
    //check for draw condition
    //set up game for next player
    //-swap players
    //-set up effects
  }

  function gameEnginePvAI(event) {
    //wait for player mark of make ai move
  }

  //Main game engine
  // const gameEngine = function (event) {
  //   const targetSquare = event.target.dataset.square;
  //   if (board.getMarketAt(targetSquare)) return; //Guard clause when square already selected
  //   event.target.textContent = currentPlayer.getMarker(); //Display marker on the DOM board
  //   board.setMarkerAt(targetSquare, currentPlayer.getMarker()); //Set marker to js board object
  //   //Check for win
  //   if (board.winCheck(currentPlayer.getMarker())) {
  //     displayMsg(`${currentPlayer.getMarker().toUpperCase()} won the round!`);
  //     currentPlayer === p1 ? p1Score++ : p2Score++;
  //     endRoundUpdate();
  //     return;
  //   }
  //   //Check for draw (map is full)
  //   if (board.boardFull()) {
  //     displayMsg(`draw`);
  //     endRoundUpdate();
  //     return;
  //   }

  //   //No win solution swap current player
  //   swapPlayer();
  //   currentPlayerEffect();
  //   event.target.style.color = "rgba(0, 0, 0, 0.8)";
  // };
  // //Set event listener to DOM boar squares
  // for (let square of squares) {
  //   square.addEventListener("click", (e) => gameEngine(e));
  //   square.addEventListener("mouseenter", function (e) {
  //     if (!board.getMarketAt(e.target.dataset.square)) {
  //       e.target.style.color = "rgba(0, 0, 0, 0.35)";
  //       e.target.textContent = currentPlayer.getMarker();
  //     }
  //   });
  //   square.addEventListener("mouseleave", function (e) {
  //     if (!board.getMarketAt(e.target.dataset.square)) {
  //       e.target.textContent = "";
  //     }
  //   });
  // }
})();

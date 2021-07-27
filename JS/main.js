"use strict";
const boardFactory = function () {
  const board = Array.from({ length: 9 }, () => null);
  const getBoard = () => board;
  const boardFull = () => !board.includes(null);
  const getMarkerAt = function (i) {
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
      if (line.every((i) => getMarkerAt(i) === marker)) return true;
    }
    return false;
  };
  return { getBoard, boardFull, getMarkerAt, setMarkerAt, winCheck };
};

const playerFactory = function (nick, marker) {
  const getNick = () => nick;
  const getMarker = () => marker;
  return { getNick, getMarker };
};

const aiPlayer = function () {
  const { getNick, getMarker } = playerFactory("AI", "o");
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
  const _boardFull = (boardState) => !boardState.includes(null);

  function _evaluate(boardState) {
    for (let line of winnerLines) {
      //Check for winning lines of Human (maximizer)
      if (line.every((index) => boardState[index] === "o")) return 10;
      //Check for winning condition for AI (minimizer)
      if (line.every((index) => boardState[index] === "x")) return -10;
    }
    return 0;
  }

  function _availableMoves(boardState) {
    return boardState
      .map((ele, i) => (ele ? ele : i))
      .filter((ele) => typeof ele === "number");
  }

  function _minimax(boardState, depth, maximizer) {
    //Check break condition for recursion
    const evalScore = _evaluate(boardState);
    if (evalScore === 10 || evalScore === -10) return evalScore;
    if (_boardFull(boardState)) return 0;
    const freeMoves = _availableMoves(boardState);
    if (maximizer) {
      let bestMove = -1000;
      for (let move of freeMoves) {
        boardState[move] = "o";
        bestMove = Math.max(
          bestMove,
          _minimax(boardState, depth + 1, !maximizer)
        );
        boardState[move] = null;
      }
      return bestMove - depth;
    } else {
      let bestMove = 1000;
      for (let move of freeMoves) {
        boardState[move] = "x";
        bestMove = Math.min(
          bestMove,
          _minimax(boardState, depth + 1, !maximizer)
        );
        boardState[move] = null;
      }
      return bestMove + depth;
    }
  }

  function findBestMove(boardState) {
    //keep track of best move and index of best move
    let bestValue = -1000;
    let bestMove;

    const freeMoves = _availableMoves(boardState);
    for (let move of freeMoves) {
      //put marker to free spot on board(move)
      boardState[move] = "o";
      //call minimax algorithm and save value
      const curValue = _minimax(boardState, 0, false);
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
  return { getNick, getMarker, findBestMove, _boardFull };
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
  let startFirst;
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
  const endRoundUpdate = function (event) {
    scoreBoard.classList.remove("none");
    leftScore.textContent = p1Score;
    rightScore.textContent = p2Score;
    newRound.classList.remove("none");
    modal.classList.remove("hidden");
    event.target.style.color = "rgba(0, 0, 0, 0.8)";
  };
  function setUpNew(p1nick, p1marker, p2nick, p2marker) {
    modal.classList.add("hidden");
    newBoard();
    p1 = playerFactory(p1nick, p1marker);
    p2 = playerFactory(p2nick, p2marker);
    currentPlayer = p1;
    startFirst = p1;
    p1Score = 0;
    p2Score = 0;
    currentPlayerEffect();
  }
  function setUpNewAI(p1nick, p1marker, p2nick, p2marker) {
    setUpNew(p1nick, p1marker, p2nick, p2marker);
    p2 = aiPlayer(p2nick, p2marker);
  }
  function setUpNewRound() {
    newBoard();
    modal.classList.add("hidden");
    startFirst = startFirst === p1 ? p2 : p1;
    currentPlayer = startFirst;
    currentPlayerEffect();
  }
  newGame.addEventListener("click", () =>
    setUpNew("player1", "x", "player2", "o")
  );
  newGameAI.addEventListener("click", () =>
    setUpNewAI("player1", "x", "AI", "o")
  );
  newRound.addEventListener("click", () => setUpNewRound());

  function gameEnginePvP(event) {
    const targetSquare = Number(event.target.dataset.square);
    if (board.getMarkerAt(targetSquare)) return; //Guard clause when square already selected
    board.setMarkerAt(targetSquare, currentPlayer.getMarker());
    event.textContent = currentPlayer.getMarker();
    //Check for win condition
    if (board.winCheck(currentPlayer.getMarker())) {
      currentPlayer === p1 ? p1Score++ : p2Score++;
      displayMsg(`${currentPlayer.getMarker().toUpperCase()} won the round!`);
      endRoundUpdate(event);
      return;
    }
    //Check for draw condition
    if (board.boardFull()) {
      displayMsg(`draw`);
      endRoundUpdate(event);
      return;
    }
    swapPlayer();
    currentPlayerEffect();
    event.target.style.color = "rgba(0, 0, 0, 0.8)";
  }

  const aiMove = (aiPlayer) => aiPlayer.findBestMove(board.getBoard());

  function gameEnginePvAI(event) {
    const targetSquare = Number(event.target.dataset.square);
    if (board.getMarkerAt(targetSquare)) return; //Guard clause when square already selected
    board.setMarkerAt(targetSquare, currentPlayer.getMarker());
    event.textContent = currentPlayer.getMarker();
    //Check for win condition
    if (board.winCheck(currentPlayer.getMarker())) {
      p1Score++;
      displayMsg(`${p1.getMarker().toUpperCase()} won the round!`);
      endRoundUpdate(event);
      return;
    }
    //Check for draw condition
    if (board.boardFull()) {
      displayMsg(`draw`);
      endRoundUpdate(event);
      return;
    }
    //Ai turn
    swapPlayer();
    currentPlayerEffect();
    const aiSpot = aiMove(currentPlayer);
    board.setMarkerAt(aiSpot, currentPlayer.getMarker());
    const temp = document.querySelector(`[data-square="${aiSpot}"]`);
    temp.textContent = currentPlayer.getMarker();
    temp.style.color = "rgba(0, 0, 0, 0.8)";
    if (board.winCheck(currentPlayer.getMarker())) {
      p2Score++;
      displayMsg(`${p2.getMarker().toUpperCase()} won the round!`);
      endRoundUpdate(event);
      return;
    }
    swapPlayer();
    currentPlayerEffect();
    event.target.style.color = "rgba(0, 0, 0, 0.8)";
  }
  //Set event listener to DOM boar squares
  for (let square of squares) {
    square.addEventListener("click", (e) => gameEnginePvAI(e));
    square.addEventListener("mouseenter", function (e) {
      if (!board.getMarkerAt(e.target.dataset.square)) {
        e.target.style.color = "rgba(0, 0, 0, 0.35)";
        e.target.textContent = currentPlayer.getMarker();
      }
    });
    square.addEventListener("mouseleave", function (e) {
      if (!board.getMarkerAt(e.target.dataset.square)) {
        e.target.textContent = "";
      }
    });
  }
})();

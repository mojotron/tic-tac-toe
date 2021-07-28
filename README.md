# TIC TAC TOE

This project is part of [The Odin Project](https://www.theodinproject.com) curriculum. Goal of the project is to continue learning about object orientated programing concepts in JS. This time creating objects with factory functions, and creating module pattern wit IIFY (Immediately Invoked Function Expression) functions. Main goal here is to have as little global code as possible.
In this project player have options to play:

1. player vs player (first round X is starting first, next round O starts first and so on, alternating starting between X and O)
2. player vs AI (here AI is made with unbeatable minimax algorithm)
3. after first round continue play with keeping and displaying score

View live preview of [Tic Tac Toe](https://mojotron.github.io/tic-tac-toe/index.html) project via GitHub pages!

## Biggest roadblocks

Understanding minimax algorithm. Before starting to make this algorithm it is crucial to understand who is maximizer and who is minimizer in the flow of minimax recursion call. How to evaluate stop condition to terminate recursion.
Evaluate function is checking state of board an returns score depending if maximizer or minimizer have reached win condition or board is full(draw).
Best way to visualize flow of recursion calls is to draw tree diagram with all possible paths that game can take from the root of board state.

#### Sample of tree diagram from GeeksForGeeks website

![possible paths from current board state](https://media.geeksforgeeks.org/wp-content/uploads/TIC_TAC.jpg)

Resources that helped me understand problem:

1. GeeksForGeeks three part series about minimax, [read here](https://www.geeksforgeeks.org/minimax-algorithm-in-game-theory-set-1-introduction/).
2. Never Stop Building blog helped me to understand how minimax flow should go, [read here](https://www.neverstopbuilding.com/blog/minimax).
3. Kylie Ying's video is also great for understanding what algorithm is suppose to do, [watch here](https://www.youtube.com/watch?v=fT3YWCKvuQE).

Implementing minimax algorithm in current design, I first made player vs player mode. After that I made first version on minimax algorithm (file in this project /JS/ticTacToeMinimax.js). Implementing AI player in current design
was little bit tricky but after some time I made it, and learned a lot about OOP in process.

Making game engine. Player versus player was strait forward, program is waiting for the click from the player 1, then swap players and wait for the next click until end game condition is reached.
When AI is playing second, it was enough to add one more if condition to check if current player is AI and update board with AIs move.
But when AI is staring first made me a lot of trouble, until I saw that AI is always picking top left corner(this is because of closest path in recursion calls in minimax algorithm). To add more dynamic, program is randomly pick corner of the board for AIs first move. This feature solved problem,
current game engine is working because now program is waiting for click from the player.

## What have I learned?

- Factory function - The factory function pattern is similar to constructors, but instead of using new to create an object, factory functions simply set up and return the new object when you call the function.
- Module pattern - the Module pattern is used to further emulate the concept of classes in such a way that we’re able to include both public/private methods and variables inside a single object
- private and public variables and methods inside objects.
- minimax algoritham - s a decision rule used in artificial intelligence, decision theory, game theory, statistics, and philosophy for minimizing the possible loss for a worst case (maximum loss) scenario
- better understanding of recursion calls
- adding image to markdown file

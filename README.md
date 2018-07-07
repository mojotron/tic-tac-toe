# Tic Tac Toe with Ruby

Tic-tac-toe is a paper-and-pencil game for two players, X and O, who take turns
marking the spaces in a 3×3 grid. The player who succeeds in placing three of 
their marks in a horizontal, vertical, or diagonal row wins the game. Learn more
on [Wikipedia](https://en.wikipedia.org/wiki/Tic-tac-toe).

This project is all about working and implementing Ruby Classes. There is three
classes TicTacToe and Board, Player. TicTacToe with initialization creates one 
Board object and two Player objects. Instance methods has only one public method 
start_game, rest are private.
There is two possible error, first if current player enters non digit character,
and second if current player enters digit of already taken position on board. 
Both error are handled in single begin/rescue block. For first case, it catch 
NoMethodError, for second case class DoubleAssignementError, which is created as
child of Standard error class and it raise error if current player try to assign
token on place where opposite players is already assign his token.

Game logic is build around checking board for all possible winning solutions
every time current player enters token on game board. If winner is found winning
message is called and adds win to score board. If winner is not found program
calls draw message. After game players are prompted if they want to play another
game, if yes, players are swapped and player 2 starts first.

Board and tokens are made with UTF-8 characters, for better UI.

This project is part of [The Odin Project curriculum](https://www.theodinproject.com/). 
Awesome on-line web development learning place!

Special thanks to my nephews who test,played and helped improve game. 

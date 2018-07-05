class TicTacToe
	attr_reader :moves, :player1, :player2, :player1_score, :player2_score

	def initialize
		@board = Board.new
		@player1 = Player.new
		@player2 = Player.new
		@player1_score = 0
		@player2_score = 0
		@moves = {
			1 => [0,0], 2 => [0,1], 3 => [0,2],
			4 => [1,0], 5 => [1,1], 6 => [1,2],
			7 => [2,0], 8 => [2,1], 9 => [2,2]
		}	
	end

	def display_board
		@board.new_board.each { |line| puts "\t#{line}" }
	end

	def player_move(token, board, move)
		raise MyError if board[move[0]][move[1]] == "\u2718" ||
			board[move[0]][move[1]] == "\u25CF"
	
			board[move[0]][move[1]] = token
	end

	def winner_found?(token, board)
		win_positions = {
			1 => [moves[1],moves[2],moves[3]],
			2 => [moves[4],moves[5],moves[6]],
			3 => [moves[7],moves[8],moves[9]],
			4 => [moves[1],moves[4],moves[7]],
			5 => [moves[2],moves[5],moves[8]],
			6 => [moves[3],moves[6],moves[9]],
			7 => [moves[1],moves[5],moves[9]],
			8 => [moves[3],moves[5],moves[7]]
		}
		winner_found = false
		win_positions.each do |key, value|
			win = []
			value.each do |item|
				board[item[0]][item[1]] == token ? win.push(true) :
					win.push(false)
			end
			winner_found = true if win.all? {|x| x == true}
		end
		winner_found
	end

	def start_game
		display_board
		i = 1
		while i <= 9
			current_player = ''
			# change players turns vith odd/even numbers
			i % 2 != 0 ? current_player = @player1 : current_player = @player2
			puts "<< Turn #{i} >>"
			print "#{current_player.username} #{current_player.user_token} enter "
			print "position number (1-9) >> "
			begin
				player_move = gets.chomp.to_i
				player_move(current_player.user_token, @board.new_board, @moves[player_move])
			rescue NoMethodError
				print "Invalid input, enter digit 1-9 for target position! >>"
				retry
			rescue MyError
				puts "Invalid input position already assign! Try again! >>"
				retry
			end
			win = winner_found?(current_player.user_token, @board.new_board)
			display_board
			if win == true
				current_player == @player1 ? @player1_score += 1 : @player2 += 1
				puts "PLAYER #{current_player.username} WON!"
				puts "#{@player1.username} #{@player1_score} : #{@player2.username} #{@player2_score}"
				new_game
			end
			i += 1
		end
		puts "DRAW !!!"
		puts "#{@player1.username} #{@player1_score} : #{@player2.username} #{@player2_score}"
		new_game
	end

	def new_game
		@board = Board.new #reset map
		@player1, @player2 = @player2, @player1#new game players swap turns
		@player1_score, @player2_score = @player2_score, @player1_score 
		puts "New game : type y/n"
		input = gets.chomp
		input == 'y' ? start_game : exit	
	end
end

class Player
	attr_reader :username, :user_token
	@@token = ["\u2718", "\u25CF"].shuffle

	def initialize
		print "Enter your username >> "
		@username = gets.chomp
		@user_token = @@token.pop
	end
end

class Board
	attr_reader :new_board

	def initialize
		@new_board = [
			["\u2780","\u2781","\u2782"],
			["\u2783","\u2784","\u2785"],
			["\u2786","\u2787","\u2788"]
		]
	end
end

class MyError < StandardError;
end

game = TicTacToe.new
game.start_game
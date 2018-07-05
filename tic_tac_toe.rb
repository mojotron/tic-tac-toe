class TicTacToe
	attr_reader :moves, :player1, :player2

	def initialize
		@board = [
			["\u2780","\u2781","\u2782"],
			["\u2783","\u2784","\u2785"],
			["\u2786","\u2787","\u2788"]
		]
		@moves = {
			1 => [0,0], 2 => [0,1], 3 => [0,2],
			4 => [1,0], 5 => [1,1], 6 => [1,2],
			7 => [2,0], 8 => [2,1], 9 => [2,2]
		}
		@player1 = Player.new
		@player2 = Player.new
	end

	def display_board
		@board.each { |line| puts "\t#{line}" }
	end

	def player_move(token, board, move)
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
		i = 1
		while i <= 9
			puts "Turn #{i} >>"
			display_board
			current_player = ''
			i % 2 != 0 ? current_player = @player1 : current_player = @player2
			puts "Enter position number(1-9) #{current_player.username},"
			print "your token is #{current_player.user_token} >> "
			player_move = gets.chomp.to_i
			player_move(current_player.user_token, @board, @moves[player_move])
			win = winner_found?(current_player.user_token, @board)
			if win == true
				display_board
				puts "PLAYER #{current_player.username} WON!"
				exit
			end
			i += 1
		end
		display_board
		puts "DRAW, no winner!!!"
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

game = TicTacToe.new
game.start_game
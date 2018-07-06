class TicTacToe
	#special tnx to my nephews Eric, Adrijan, Bruno,
	#without your testing this project would be much less awesome :p
	attr_reader :board, :player1, :player2

	def initialize
		@board = Board.new
		@player1 = Player.new
		@player2 = Player.new	
	end

	def display_board #display board array line by line
		@board.new_board.each { |line| puts "\t#{line.to_s.gsub('"','').gsub(',', ' |')}" }
	end

	def player_move(token, board, move)
		#raise error if player trys reassign position
		raise MyAssignementError if board[move[0]][move[1]] == "\u2718" ||
			board[move[0]][move[1]] == "\u25CF"
		#place token on wanted position	
		board[move[0]][move[1]] = token
	end

	def winner_found?(token, board, win_positions) #check for 1 of 8 winning posibilitys
		winner_found = false #flag variable
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
		9.times do |i| #9 position, so 9 possible turns
			current_player = ''
			# change players turns vith odd/even numbers
			(i+1) % 2 != 0 ? current_player = @player1 : current_player = @player2
			puts "<< Turn #{i + 1} >>"
			print "#{current_player.username} #{current_player.user_token} enter "
			print "position number (1-9) >> "
			#catch errors, invalid input(non digit), and reassignement
			begin
				player_move = gets.chomp.to_i
				player_move(current_player.user_token, @board.new_board, @board.moves[player_move])
			rescue NoMethodError
				print "Invalid input, enter digit 1-9 for target position! >>"
				retry
			rescue MyError
				puts "Invalid input position already assign! Try again! >>"
				retry
			end
			win = winner_found?(current_player.user_token, @board.new_board, @board.win_positions)
			display_board
			if win == true
				current_player.score += 1
				puts "PLAYER #{current_player.username} WON!"
				score_board_display
				new_game
			end
		end
		puts "DRAW !!!"
		score_board_display
		new_game
	end

	def new_game
		@board = Board.new #reset map
		@player1, @player2 = @player2, @player1#new game players swap turns
		puts "New game : type y/n"
		input = gets.chomp
		input == 'y' ? start_game : exit	
	end

	def score_board_display
		puts "#{@player1.username} #{@player1.score} : #{@player2.username} #{@player2.score}"
	end
end

class Player
	attr_reader :username, :user_token, :score
	attr_writer :score
	@@token = ["\u2718", "\u274d"].shuffle

	def initialize
		print "Enter your username >> "
		@username = gets.chomp
		@user_token = @@token.pop
		@score = 0
	end
end

class Board
	attr_reader :new_board, :moves, :win_positions

	def initialize
		@new_board = [
			["\u2780","\u2781","\u2782"],
			["\u2783","\u2784","\u2785"],
			["\u2786","\u2787","\u2788"]
		]
		@moves = {
			1 => [0,0], 2 => [0,1], 3 => [0,2],
			4 => [1,0], 5 => [1,1], 6 => [1,2],
			7 => [2,0], 8 => [2,1], 9 => [2,2]
		}
		@win_positions = {
			1 => [moves[1],moves[2],moves[3]],
			2 => [moves[4],moves[5],moves[6]],
			3 => [moves[7],moves[8],moves[9]],
			4 => [moves[1],moves[4],moves[7]],
			5 => [moves[2],moves[5],moves[8]],
			6 => [moves[3],moves[6],moves[9]],
			7 => [moves[1],moves[5],moves[9]],
			8 => [moves[3],moves[5],moves[7]]
		}
	end
end

class MyAssignementError < StandardError;
end

game = TicTacToe.new
game.start_game
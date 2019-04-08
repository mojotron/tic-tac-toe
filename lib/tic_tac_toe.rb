require_relative "board_class.rb"
require_relative "player_class.rb"

class DoubleAssignementError < StandardError;
end

class TicTacToe
	attr_reader :board, :player1, :player2

  def initialize
    puts_banner()
		@board = Board.new
		@player1 = Player.new
		@player2 = Player.new	
  end
  
  def puts_banner()
    puts """
   _____ _      _____          _____         
  |_   _(_)__  |_   _|_ _ __  |_   _|__  ___ 
    | | | / _|   | |/ _` / _|   | |/ _ \\/ -_)
    |_| |_\\__|   |_|\\__,_\\__|   |_|\\___/\\___|
                   
    """

  end

	def start_game
    9.times do |i| #9 position, for 9 possible turns
      puts `clear`
      puts_banner()
      @board.display_board
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
			rescue DoubleAssignementError
				puts "Invalid input position already assign! Try again! >> "
				retry
			end
      win = winner_found?(current_player.user_token, @board.new_board, @board.win_positions)
      puts `clear`
      puts_banner()
			@board.display_board
			if win == true
				current_player.score += 1
				end_game_log("PLAYER #{current_player.username} WON!")
			end
		end
		end_game_log("DRAW!!!")
	end

	private
	def winner_found?(token, board, win_positions) #check for 1 of 8 winning posibilitys
		winner_found = false #flag variable
		win_positions.each do |key, value|
			win = value.collect do |item|
				board[item[0]][item[1]] == token 
			end
			winner_found = true if win.all? {|x| x == true}
		end
		winner_found
	end

	def player_move(token, board, move)
		#raise error if player trys reassign position
		raise DoubleAssignementError if board[move[0]][move[1]] == @player1.user_token ||
			board[move[0]][move[1]] == @player2.user_token
		#place token on wanted position	
		board[move[0]][move[1]] = token
	end

	def end_game_log(message)
		puts message
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







game = TicTacToe.new
game.start_game
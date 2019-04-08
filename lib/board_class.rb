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
	
	def display_board #display board array line by line
		@new_board.each do |line| 
		 puts "\t\t\s#{line.to_s.gsub(/"/,'').gsub(/[,\[\]]/, "|")}"
     end
     puts
	end
end
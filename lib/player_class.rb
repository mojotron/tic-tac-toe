class Player
	attr_reader :username, :user_token, :score
	attr_writer :score
	@@token = ["\u2718", "\u274d"].shuffle
	@@player_count = 1 #class count variable
	def initialize
		print "Player #{@@player_count} enter your username >> "
		@username = gets.chomp
		@user_token = @@token.pop
		@score = 0
		@@player_count += 1
	end
end
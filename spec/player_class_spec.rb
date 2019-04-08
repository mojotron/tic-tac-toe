require "./lib/player_class"

RSpec.describe Player do
  subject { Player.new }
  
  context "initialize player" do
    it "cupture name" do
      allow($stdin).to receive(:gets).and_return('Rusty')
      actual = $stdin.gets
      expected = "Rusty"
      expect(actual).to eq expected
    end
    it "get player count" do
      actual = subject.player_count
      expected = 1
      expect(actual).to eq expected
    end
  end
end
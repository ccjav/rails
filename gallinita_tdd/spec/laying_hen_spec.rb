require 'laying_hen'

describe LayingHen do
  let(:gallina) { LayingHen.new }

  describe "#initialize" do
    it "creates a new hen" do
      expect(gallina).to be_an_instance_of LayingHen
    end
  end

  context "when the hen is initialized" do
    describe "#age" do
      it "returns the hen's starting age" do
        expect(gallina.age).to eq(0)
      end
    end

    describe "#eggs" do
      it "returns the hen's starting eggs" do
        expect(gallina.eggs).to eq(0)
      end
    end
  end

  context "when the hen ages" do
    describe "#age!" do
      it "returns the hen's age after one month" do
        expect(gallina.age!).to eq(1)
      end
    end

    describe "#any_eggs?" do
      it "returns false" do
        expect(gallina.any_eggs?).to be false
      end

      it "returns true" do
        gallina.age! until gallina.any_eggs?
        expect(gallina.any_eggs?).to be true
      end
    end
  end

  context "egg picking" do
    it "throws error" do
      expect(gallina.pick_an_egg!).to raise_error
    end    
  end
end

describe Egg do
  # Egg tests here
end

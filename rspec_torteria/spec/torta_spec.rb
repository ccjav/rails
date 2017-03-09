require 'torta'

describe Torta do

  let(:type)  { "milanesa" }
  let(:torta) { Torta.new(type) }

  subject { torta }
  it { is_expected.to respond_to(:type) }

  describe "#initialize" do
    context "with valid input" do
      it "creates a new Torta of the specified type" do
        expect(torta.type).to eq(type)
      end
    end

    context "with invalid input" do
      it "throws an argument error when not given a type argument" do
        expect { Torta.new }.to raise_error(ArgumentError)
      end
    end
  end

  describe "#type" do
    it "returns the type of the torta" do
      torta_type = torta.type
      expect(torta_type).to eq (type)
    end
  end

  describe "#bake!" do
    it "requires an integer time argument"

    it "returns the torta object" do
      torta
    end

    it "changes the status of the torta when given enough time" do
      expect { torta.bake!(10) }.to change(torta, :status)
    end
  end

  describe "#status" do
    it "returns the torta's current status" do
      torta.status
    end

    context "when unbaked" do
      it "is `crudo`"
    end

    context "when baked for less than 5 minutes" do
      it "is `crudo`"
    end

    context "when baked for at least 5 but less than 7 minutes" do
      it "is `casi listo`"
    end

    context "when baked for at least 7 but less or equal than 10 minutes" do
      it "is `listo`"
    end

    context "when baked for at least 11 minutes" do
      it "is `quemado`"
    end
  end

  describe "#bake_time" do
    it "returns bake time of the specified type" do 
      torta.bake_time
    end
  end
end

require 'account'

describe Account do
  let(:account) { Account.new("0123456789") }
  let(:bad_account) { Account.new("123") }

  describe "#initialize" do
    context "with valid input" do
      it "creates a new Account" do
        # o = Object.new
        expect(account).to be_an_instance_of Account
      end
    end

    context "with invalid input" do
      it "throws an InvalidAccountNumberError when acct_number has less than 10 digits" do
        # bad_account = Account.new
        expect{bad_account}.to raise_error(InvalidAccountNumberError)
      end
    end
  end

  context "when using default starting_balance" do
    describe "#transactions" do
      it "returns the default starting_balance" do
        expect(account.transactions).to eq([0])
      end
    end

    describe "#balance" do
      it "is 0" do
        expect(account.balance).to be 0 
      end
    end
  end

  context "when initialized with a starting_balance" do
    let(:account) { Account.new("1234567890", 100) }

    describe "#transactions" do
      it "returns the specified balance" do
        expect(account.transactions).to eq([100])
      end
    end

    describe "#balance" do
      it "is the specified balance" do
        expect(account.balance).to be 100
      end
    end

    describe "#withdraw!" do
      it "decreases the balance" do
        expect(account.withdraw!(10)).to be 90
      end

      it "substracts positive amounts" do

      end
    end
  end

  describe "#account_number" do
    it "masks the number of the account" do
      expect(account.acct_number).to eq("******6789")
    end
  end

  describe "deposit!" do
    it "requires a positive amount" do
      expect{account.deposit!(-1)}.to raise_error(NegativeDepositError)
    end

    it "increases the balance of the account" do
      expect(account.deposit!(100)).to be 100
    end
  end

  describe "#withdraw!" do
    it "throws an OverdraftError when withdraw amount is bigger than balance" do
      expect{account.withdraw!(100)}.to raise_error(OverdraftError)
    end
  end
end

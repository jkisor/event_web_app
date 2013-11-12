require 'spec_helper'

describe User do
	before do 
		@user = User.new(name:"example", password: "1234")
	end
	
	subject { @user }
	
	it { should respond_to :name }
	it { should respond_to :password }
	it { should respond_to :password_confirmation }

	it { should respond_to :password_hash }
	it { should respond_to :password_salt }
  it { should respond_to :events }

	describe "when name is not present" do
		before { @user.name = " " }
    	it { should_not be_valid }
	end

	describe "remember token" do
  		before { @user.save }
  		it "has a remember token" do
  			expect(@user.remember_token).not_to be_nil
  		end
  	end

  	describe "#authenticate" do
  		before { @user.save }
    	let(:found_user) { User.find_by(name: @user.name) }

  		context "when password is incorrect" do
  			it "returns nil" do
  				expect(User.authenticate(found_user.name, "incorrect")).to be_nil
  			end
  		end

  		context "when password is correct" do
  			it "returns the user" do
  				expect(User.authenticate(found_user.name, @user.password)).to eq(@user)
  			end
  		end
  	end
end
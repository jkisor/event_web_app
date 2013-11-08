require 'spec_helper'

describe User do
	before do 
		@user = User.new(name:"example")
	end
	
	subject { @user }
	
	it { should respond_to :name }


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
end
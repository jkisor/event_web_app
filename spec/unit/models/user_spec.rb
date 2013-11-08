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
end
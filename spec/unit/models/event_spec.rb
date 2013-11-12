require 'spec_helper'

describe Event do
# Name
# Location
# Description
# Date/Time
	before do 
		@event = Event.new(name:"example")
	end
	
	subject { @event }
	
	it { should respond_to :name }
	it { should respond_to :location }
	it { should respond_to :description }
	it { should respond_to :datetime }
	it { should respond_to :users }
end
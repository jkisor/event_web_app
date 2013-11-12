require 'spec_helper'

describe 'GET /events' do
	before do 
		@events = [ 
			{name: "Metal Concert", status: "available"},
			{name: "Party", status: "attending"}
		]
		get '/events'
	end
	it "returns events in json format" do
		expect(last_response).to be_ok
		expect(last_response.body).to eq(@events.to_json)
	end
end
require 'spec_helper'

describe 'GET /events' do
	include Rack::Test::Methods
	before do 
		@events = [ 
			{name: "Metal Concert", status: "available"},
			{name: "Party", status: "attending"}
		]
		get '/events'
	end
	it " derp" do
		expect(last_response).to be_ok
		expect(last_response.body).to eq(@events.to_json)

	end
end
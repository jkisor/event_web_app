require 'spec_helper'

#given there are no events
#when i go to the home page
#i should see no events message
describe "viewing list of events", :js => true do
	before do 
		visit '/'
		sleep(1)
	end
	context "given there are no events" do
		it "displays no events message" do
			expect(page).to have_content("There are no events.")
		end
	end

	context "given many events" do
		before do
			@events = [Event.new("Metal Concert", "available"),
						Event.new("Party", "attending")]
		end
		xit "displays events grouped by status" do
			@events.each do |event|
				expect(page).to have_css(".#{event.status} .event", text: event.name)
			end
		end
	end
end
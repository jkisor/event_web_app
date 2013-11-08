require 'spec_helper'

describe 'user signup' do
	subject { page }
	before { visit '/signup' }
	let(:create) { 'Create account' }
	
	it { should have_content('Sign up') }
  	
	context "when invalid information is provided" do
		it "doesn't create a user" do
			expect { click_button create }.not_to change(User, :count)
		end
	end

	context "when valid information is provided" do
		before do
			fill_in 'user_name', with: 'sophie'
		end

		it "adds a new user to the database" do
			expect { click_button create}.to change(User, :count).by(1)
		end
	end
end
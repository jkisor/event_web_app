require 'spec_helper'

describe "signing in" do	
	before { visit '/signin' }
	subject { page }
	it { should have_content('Sign in') }
	context 'invalid credentials are entered' do
		before { click_button "Sign in" }
		it { should have_selector('div.alert.alert-danger', text: 'Invalid') }
	end

	context 'valid credentials are entered' do
		let(:user) { User.create(name: 'testuser') }
		before do
			fill_in 'user_name', with: user.name
			click_button "Sign in"
		end
		it { should have_selector('div.alert.alert-success', text: 'Welcome back') }
	
		context "after signout" do
			before { click_button "Sign out" }
			it { should have_link('Sign in') }
		end
	end



end
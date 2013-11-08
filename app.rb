require "sinatra"
require "sinatra/activerecord"
require 'sinatra/flash'

Dir["./helpers/*.rb"].each { |file| require file }
Dir["./models/*.rb"].each { |file| require file }

enable :sessions

set :database, "sqlite3:///app.db"
before do
 	@session = session
end

helpers do
 	include SessionHelper	
end

Event = Struct.new(:name, :status)

get '/' do
	@events = [Event.new("Metal Concert", "available"),
						Event.new("Party", "attending")]
	erb :'events/index'
end

get '/events' do
	[Event.new("Metal Concert", "available"),
						Event.new("Party", "attending")].to_json
end

get '/signup' do
	erb :'signup'
end

post '/signup' do
	@user = User.new(params[:user])
	if @user.save
		redirect '/'
	else
		redirect 'signup'
	end
end

get '/signin' do
	erb :'signin'
end

post '/signin' do
	user = User.find_by(name: params[:user][:name])
	if user.nil?
		flash.now[:danger] = "Invalid"
		erb :'signin'
	else
		sign_in user
		flash[:success] = "Welcome back"
		redirect '/'
	end
end

delete '/signout' do
	sign_out
	redirect '/'
end

# get '/view1' do
# end
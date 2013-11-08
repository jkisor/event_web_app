require "sinatra"
require "sinatra/activerecord"
require 'sinatra/flash'

Dir["./models/*.rb"].each { |file| require file }

enable :sessions

set :database, "sqlite3:///app.db"

Event = Struct.new(:name, :status)

get '/' do
	@events = [Event.new("Metal Concert", status: "available"),
						Event.new("Party", status: "attending")]
	erb :'events/index'
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
	@user = User.find_by(name: params[:user][:name])
	if @user.nil?
		flash.now[:danger] = "Invalid"
		erb :'signin'
	else
		flash[:success] = "Welcome back"
		redirect '/'
	end
end
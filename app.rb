require "sinatra"
require "sinatra/activerecord"
Dir["./models/*.rb"].each { |file| require file }

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
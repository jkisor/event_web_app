require "sinatra"
require "sinatra/activerecord"
require 'sinatra/flash'
require "sinatra/json"
require 'bcrypt'

Dir["./helpers/*.rb"].each { |file| require file }
Dir["./models/*.rb"].each { |file| require file }

enable :sessions

set :database, "sqlite3:///app.db"
set :port, 9393
before do
 	@session = session
end

helpers do
 	include SessionHelper	
end

get '/' do
	# @events = [Event.new("Metal Concert", "available"),
	# 					Event.new("Party", "attending")]
	# erb :'events/index'
	File.read(File.join('public', 'index.html'))
end

get '/events' do
	Event.all.to_json(include: :users)
	# json Event.all
end

put '/events/:id' do |id|
	params = JSON.parse(request.body.read)

	event = Event.find(id)

	event.users = []
	params["users"].each do |user|
		event.users << User.find(user["id"]);
	end
	
	event.save
	event.to_json(include: :users)
end


post '/events' do
	params = JSON.parse(request.body.read)
	event = Event.new(params)#current_user.posts.build(params[:post])
	event.save
	# if(event.save)
	# 	# flash[:success] = "Thanks for posting."
	# else
	# 	# flash[:error] = "Please enter a message"
	# end
	# params[:event]
end

get '/events/:id' do |id|
	Event.find(id).to_json(include: :users)
end

delete '/events/:id' do |id|
	Event.find(id).destroy
end

# get '/signup' do
# 	erb :'signup'
# end
get '/users/:id' do |id|
	User.find(id).to_json(include: :events)
end

put '/users/:id' do |id|
	# params = JSON.parse(request.body.read)
	params = JSON.parse(request.body.read)

	user = User.find(id)

	user.events = []
	params["events"].each do |event|
		user.events << Event.find(event["id"]);
	end
	
	user.save
	user.to_json(include: :events)
end

post '/users' do

	params = JSON.parse(request.body.read)
	user = User.new(params)#current_user.posts.build(params[:post])
	user.save
	# @user = User.new(params[:user])
	# if @user.save
	# 	redirect '/'
	# else
	# 	redirect 'signup'
	# end
end

# get '/signin' do
	# erb :'signin'
# end
# error MyCustomError do
#   'So what happened was...' + env['sinatra.error'].message
# end

post '/signin' do
	params = JSON.parse(request.body.read)

	user = identify_user(params);
	
	if user.nil?
		raise "ERROR!!"
		puts "USER NOT FOUND"
	else
		puts "USER FOUND"

		return user.to_json(include: :events)
	end
	# if(params)
	# user = User.find_by(name: params[:user][:name])
	# if user.nil?
	# 	flash.now[:danger] = "Invalid"
	# 	erb :'signin'
	# else
	# 	sign_in user
	# 	flash[:success] = "Welcome back"
	# 	redirect '/'
	# end
end

def identify_user(params)
	puts "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
		puts "IDENTIFY"
	puts "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"

	if params["token"].nil? 
		puts "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
		puts "username and password"
		puts "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
		name = params["username"]
		password = params["password"]

		user = User.authenticate(name, password)	
	else
		puts "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
		puts params["token"]
		puts "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"

		# user = User.find_by(remember_token: params["token"]);
	end
end



delete '/signout' do
	sign_out
	redirect '/'
end

# get '/view1' do
# end
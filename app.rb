require "sinatra"
require "sinatra/activerecord"
require 'sinatra/flash'
require "sinatra/json"
require 'bcrypt'

Dir["./helpers/*.rb"].each { |file| require file }
Dir["./models/*.rb"].each { |file| require file }
Dir["./routes/*.rb"].each { |file| require file }

enable :sessions

set :database, "sqlite3:///app.db"
set :port, 9393

helpers do
 	include SessionHelper	
end

get '/' do
	File.read(File.join('public', 'index.html'))
end



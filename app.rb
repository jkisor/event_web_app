require "sinatra"
require "sinatra/activerecord"

set :database, "sqlite3:///app.db"

Event = Struct.new(:name, :status)

get '/' do
	@events = [Event.new("Metal Concert", status: "available"),
						Event.new("Party", status: "attending")]
	erb :'events/index'
end
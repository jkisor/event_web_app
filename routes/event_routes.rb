get '/events' do
	Event.all.to_json(include: :users)
end

put '/events/:id' do |id|
	params = JSON.parse(request.body.read)

	event = Event.find(id)
	event.update_attributes(params);

	event.to_json(include: :users)
end


post '/events' do
	params = JSON.parse(request.body.read)
	event = Event.create!(params)
end

get '/events/:id' do |id|
	Event.find(id).to_json(include: :users)
end

delete '/events/:id' do |id|
	Event.find(id).destroy
end
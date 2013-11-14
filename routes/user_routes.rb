get '/users/:id' do |id|
	User.find(id).to_json(include: :events)
end

put '/users/:id' do |id|
	params = JSON.parse(request.body.read)

	user = User.find(id)
	user.update_attributes(params);

	user.to_json(include: :events)
end

post '/users' do
	params = JSON.parse(request.body.read)
	
	user = User.create!(params)
end
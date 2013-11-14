post '/signin' do
	params = JSON.parse(request.body.read)

	user = identify_user(params);
	
	if user.nil?
		raise "Sign in error!"
		puts "Sign in error"
	else
		puts "Sign in success"

		return user.to_json(include: :events)
	end
end

def identify_user(params)

	if params["token"].nil? 
		name = params["username"]
		password = params["password"]

		user = User.authenticate(name, password)	
	else
		user = User.find_by(remember_token: params["token"]);
	end
end

delete '/signout' do
	sign_out
	redirect '/'
end
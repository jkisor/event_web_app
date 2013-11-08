module SessionHelper
	def sign_in(user)
		remember_token = User.new_remember_token
		@session[:remember_token] = remember_token
		user.update_attribute(:remember_token, User.encrypt_token(remember_token))
		self.current_user = user
	end

  	def sign_out
    	self.current_user = nil
    	@session.clear
  	end

	def current_user=(user)
    	@current_user = user
  	end

	def current_user
		encrypted_token = User.encrypt_token(@session[:remember_token])
		
		@current_user ||= User.find_by(remember_token: encrypted_token)
	end

	def signed_in?
		!current_user.nil?
	end
end
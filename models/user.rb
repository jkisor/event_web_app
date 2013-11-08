class User < ActiveRecord::Base
	validates_presence_of :name

	before_create :create_remember_token

	def self.new_remember_token
		SecureRandom.urlsafe_base64
	end

  	def User.encrypt_token(token)
    	Digest::SHA1.hexdigest(token.to_s)
  	end

	private
	
	def create_remember_token
		self.remember_token = User.encrypt_token(User.new_remember_token)
	end
end
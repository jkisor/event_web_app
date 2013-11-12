class User < ActiveRecord::Base

	has_and_belongs_to_many :events	

	attr_accessor :password, :password_confirmation
	
	validates_presence_of :name

	before_create :encrypt_password
	before_create :create_remember_token
	



	def self.new_remember_token
		SecureRandom.urlsafe_base64
	end

  	def User.encrypt_token(token)
    	Digest::SHA1.hexdigest(token.to_s)
  	end

  	def User.authenticate(name, password)
  		user = User.find_by(name: name)
  		if(user && user.password_hash == BCrypt::Engine.hash_secret(password, user.password_salt))
			user
		else
			nil
		end 
  	end

	private
	
	def create_remember_token
		self.remember_token = User.encrypt_token(User.new_remember_token)
	end

	def encrypt_password
		self.password_salt = BCrypt::Engine.generate_salt
		self.password_hash = BCrypt::Engine.hash_secret(password, password_salt)	
	end
end
class User < ActiveRecord::Base

	has_and_belongs_to_many :events	

	attr_accessor :password, :password_confirmation
	
	validates_presence_of :name
	validates_presence_of :password, :on => :create
	validates_presence_of :password_confirmation, :on => :create

	validates_uniqueness_of :email, :name 
	validates_confirmation_of :password
	
	VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z]+)*\.[a-z]+\z/i
	validates_format_of :email, with: VALID_EMAIL_REGEX

	before_create :encrypt_password
	before_create :create_remember_token

	before_save { self.email.downcase! }

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

	def update_attributes(attributes)
        if attributes.include? "events"
            eventIDs = []  
            attributes["events"].each { |e| eventIDs << e["id"]; }
            attributes.delete "events"

            attributes["event_ids"] = eventIDs;
           
        end
        super(attributes)
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
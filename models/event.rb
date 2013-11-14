class Event < ActiveRecord::Base
	has_and_belongs_to_many :users

	def update_attributes(attributes)
        	puts "!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!"
        	puts attributes

        if attributes.include? "users"
            userIDs = []  
            attributes["users"].each { |u| userIDs << u["id"]; }
            attributes.delete "users"

            attributes["user_ids"] = userIDs;
           
        end

        puts ""
        puts ""

        puts ""

        puts "after!!!!!!!!!!!!"

       	puts attributes

        super(attributes)
    end
end
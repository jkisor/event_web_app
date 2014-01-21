ENV['RACK_ENV'] = 'test'
require './app'
require 'rack/test'
require 'capybara'
require 'capybara/dsl'
require 'capybara/webkit'
require 'database_cleaner'
require './helpers/session_helper'

#Suppress database output
ActiveRecord::Base.logger.level = Logger::INFO

Capybara.javascript_driver = :webkit
Capybara.app = Sinatra::Application



module RSpecMixin
  include Rack::Test::Methods
  def app() Sinatra::Application end
end

# For RSpec 2.x
RSpec.configure do |c| 
	c.include RSpecMixin
	c.include Capybara::DSL

 
	c.before(:suite) do
	    #DatabaseCleaner.strategy = :transaction
		#DatabaseCleaner.clean_with(:truncation)
	end

	c.before(:each) do
	    DatabaseCleaner.start
	end

	c.after(:each) do
	    DatabaseCleaner.clean
	end
end
class AddPasswordHashAndSaltToUsers < ActiveRecord::Migration
  def up
	add_column :users, :password_hash, :binary
	add_column :users, :password_salt, :binary

  end

  def down
  	remove_column :users, :password_salt
  	remove_column :users, :password_hash
  end
end

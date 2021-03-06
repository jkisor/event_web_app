class AddEvents < ActiveRecord::Migration
  def up
  	create_table :events do |t|
  		t.string :name
  		t.string :location
  		t.text :description
  		t.datetime :datetime
  		t.timestamps
  	end
  end

  def down
  	drop_table :events
  end
end

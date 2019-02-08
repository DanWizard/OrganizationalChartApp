class DropSuperiorssTable < ActiveRecord::Migration
  def change
  	drop_table :superiors do |t|
      t.integer :superior_id, null: false
      t.timestamps null: false
    end
  end
end

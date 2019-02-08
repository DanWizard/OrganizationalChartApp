class CreateSuperiors < ActiveRecord::Migration
  def change
    create_table :superiors do |t|
      t.references :user, index: true, foreign_key: true
      t.integer :superior_id

      t.timestamps null: false
    end
  end
end

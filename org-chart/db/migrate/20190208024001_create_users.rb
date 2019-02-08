class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :title
      t.integer :manger_id
      t.integer :employee_id

      t.timestamps null: false
    end
  end
end

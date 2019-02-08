class RemoveEmployeeFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :employee_id, :integer
  end
end

class AddMangerIdToMember < ActiveRecord::Migration
  def change
  	add_column :members, :manager_id, :integer
  end
end

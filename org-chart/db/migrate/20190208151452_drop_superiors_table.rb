class DropSuperiorsTable < ActiveRecord::Migration
  def change
  	def up
    	drop_table :superiors
  	end
  	def down
    	raise ActiveRecord::IrreversibleMigration
  	end

  end
end

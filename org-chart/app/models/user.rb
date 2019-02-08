class User < ActiveRecord::Base
	# attr_accessor :first_name, :employee_id, :manager_id
	# has_many :subordinates, :class_name => 'User', :foreign_key => :manager_id
	# belongs_to :manager, :class_name => 'User'
	has_many :subordinates, through: :superior_subordinates, source: :subordinate
	has_many :superior_subordinates, foreign_key: :superior_id, class_name: "Superior"
	has_many :superiors, through: :superior_superiors, source: :superior
	has_many :superior_superiors, foreign_key: :user_id, class_name: "Superior"

	# def self.first_names
	# 	all.map(&:first_name)
	# end
end

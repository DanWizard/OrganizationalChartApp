class Member < ActiveRecord::Base
	has_many :subordinates, class_name: 'Member', 
                         foreign_key: 'manager_id'
 	belongs_to :manager, class_name: 'Member'
 	validates :title, :name, presence: true, length: { in: 2..20}
end

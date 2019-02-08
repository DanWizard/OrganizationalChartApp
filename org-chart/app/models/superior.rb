class Superior < ActiveRecord::Base
  belongs_to :subordinate, foreign_key:"user_id", class_name: "User"
  belongs_to :superior, foreign_key: 'superior_id', class_name: 'User'
end

json.extract! user, :id, :first_name, :last_name, :email, :title, :manger_id, :employee_id, :created_at, :updated_at
json.url user_url(user, format: :json)
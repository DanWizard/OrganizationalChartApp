Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :members do
      	# get 'children'
      end
    end
  end
  get 'api/v1/members/:id/children' => 'api/v1/members#children'
  get 'api/v1/members/:id/manager' => 'api/v1/members#manager'
end

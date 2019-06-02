Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:show, :create] do 
      resources :servers, only: [:index]
    end
    resource :session, only: [:create, :destroy]
    resources :servers, only: [:show, :create, :update, :destroy] do
      collection do 
        post "join"
      end
      collection do 
        delete "leave"
      end
      resources :channels, only: [:index, :create]
    end
    resources :channels, only: [:destroy, :update] do 
      resources :messages, only: [:index, :create]
    end
    resources :messages, only: [:update, :destroy]
  end
end

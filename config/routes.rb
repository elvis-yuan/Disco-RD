Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root to: 'static_pages#root'

  mount ActionCable.server, at: "/cable"

  namespace :api, defaults: { format: :json } do 
    resources :users, only: [:show, :create] do 
      resources :servers, only: [:index]
    end
    resource :session, only: [:create, :destroy]
    resources :servers, only: [:show, :create, :update, :destroy] do
      collection do 
        post "join"
        delete "leave"
        get "directmessages"
      end
      resources :channels, only: [:index, :create] do 
        collection do 
          post "directmessage"
        end
      end
    end
    resources :channels, only: [:show, :destroy, :update] do 
      resources :messages, only: [:index, :create]
    end
    resources :messages, only: [:update, :destroy]
  end
end

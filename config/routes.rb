Rails.application.routes.draw do
  
  namespace :api do
    namespace :v1 do
      resources :favorites
      resources :item_listings, only: [:index, :show, :create, :update, :destroy]
      resources :transactions
      get "/my-listings", to: "item_listings#userIndex"
    end
  end
    
    
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post "/login", to: "sessions#create"
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"
 
 
  # fix deploy problem
  get "*path", to: "application#fallback_index_html", constraints: ->(req) { !req.xhr? && req.format.html? }
end

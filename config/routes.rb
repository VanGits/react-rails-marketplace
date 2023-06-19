Rails.application.routes.draw do
  resources :favorites
  resources :item_listings, only: [:index, :show, :create, :update, :destroy]
  resources :transactions
 
  
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  post "/login", to: "sessions#create"
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"
  get "/my-listings", to: "item_listings#userIndex"
end

Rails.application.routes.draw do
  resources :conversations
  
 
  
  namespace :api do
   
    namespace :v1 do
      resources :favorites, only: [:index, :show, :update, :destroy]
      resources :item_listings
      resources :offers
      get "/trending-four", to: "item_listings#topFour"
      get "/cheapest-four", to: "item_listings#bottomFour"
      get "/my-listings", to: "item_listings#userIndex"
      get "/my-listings/:id", to: "item_listings#protected_show"
     
    end
  end
    
    
  
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
  
  post "/login", to: "sessions#create"
  post "/signup", to: "users#create"
  get "/me", to: "users#show"
  delete "/logout", to: "sessions#destroy"
 
  resources :messages
  # action cable server
  mount ActionCable.server => "/cable"
 
  # fix deploy problem
  get "*path", to: "root#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end

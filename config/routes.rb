Rails.application.routes.draw do
  root 'static_pages#root'
  get 'r/*subreddit' => 'r#index'

  namespace 'api', defaults: { format: :json } do
    resources :posts
  end
end

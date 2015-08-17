Rails.application.routes.draw do
  get '/' => 'r#index'
  get 'r/*subreddit' => 'r#index'

  namespace 'api', defaults: { format: :json } do
    resources :posts
  end
end

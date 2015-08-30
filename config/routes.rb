Rails.application.routes.draw do
  get '/' => 'r#index'
  get 'r/*subreddit/(*sort)' => 'r#index'
  post 'r/*subreddit/(*sort)' => 'r#index', as: 'subreddits'
  get '(*sort)' => 'r#index'
end

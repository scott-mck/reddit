Rails.application.routes.draw do
  get '/' => 'r#index'
  post '/' => 'r#search', as: 'front'
  post 'r/(*subreddit)/' => 'r#search', as: 'subreddits'
  get 'r/(*subreddit)/(*sort)' => 'r#index'
  get '(*sort)' => 'r#index'
end

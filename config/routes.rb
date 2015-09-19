Rails.application.routes.draw do
  get '/' => 'r#index'
  post '/' => 'r#search', as: 'front'
  get 'r/(*subreddit)/(*sort)' => 'r#index'
  get '(*sort)' => 'r#index'
end

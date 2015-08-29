Rails.application.routes.draw do
  get '/' => 'r#index'
  get 'r/*subreddit/(*sort)' => 'r#index'
  get '(*sort)' => 'r#index'
end

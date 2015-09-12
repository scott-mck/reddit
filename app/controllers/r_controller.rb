# TODO: Create log-in modal
# TODO: Fetch correct sponsored posts
# TODO: Allow for pagination

class RController < ApplicationController
  def index
    @time_sort = true if %w(controversial top).include? params[:sort]

    @data = get_reddit_html
    @subreddit = params[:subreddit] ? "/r/#{params[:subreddit]}/" : "/"
    @sort = params[:sort]
  end
end

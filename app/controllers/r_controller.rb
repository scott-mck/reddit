# TODO: Fetch correct sponsored posts

class RController < ApplicationController
  def index
    @show_time_sort = true if %w(controversial top).include? params[:sort]
    @t = params[:t] || 'day'

    @data = get_reddit_html
    @subreddit = params[:subreddit] ? "/r/#{params[:subreddit]}/" : "/"
    @sort = params[:sort]
  end

  def show
    
  end
end

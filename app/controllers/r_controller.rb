class RController < ApplicationController
  def index
    redirect_to '/' if params[:subreddit] == 'front'
    @subreddit = '/r/' + params[:subreddit] if params[:subreddit]
  end
end

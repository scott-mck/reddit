class RController < ApplicationController
  def index
    redirect_to '/' if params[:subreddit] == 'front'
    if (params[:subreddit].nil? || params[:subreddit] == 'front') &&
       params[:sort] == 'hot'
       redirect_to '/'
    end
    @subreddit = '/r/' + params[:subreddit] if params[:subreddit]
  end
end

# TODO: Create log-in modal
# TODO: Create search, login, new submits, ad, and daily gold goal sidebar
# TODO: Fetch correct sponsored posts
# TODO: Create 'about' footer
# TODO: Allow for pagination
# TODO: Fix 'gilded', 'wiki', and 'promoted' tab fetching


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

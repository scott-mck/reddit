# TODO: Create log-in modal
# TODO: Fetch correct sponsored posts
# TODO: Allow for pagination
# TODO: Fix 'gilded', 'wiki', and 'promoted' tab fetching

class RController < ApplicationController
  def index
    @data = get_reddit_html
    @subreddit = '/r/' + params[:subreddit] if params[:subreddit]
  end
end

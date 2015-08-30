# TODO: Create log-in modal
# TODO: Create search, login, new submits, ad, and daily gold goal sidebar
# TODO: Fetch correct sponsored posts
# TODO: Create 'about' footer
# TODO: Allow for pagination
# TODO: Fix 'gilded', 'wiki', and 'promoted' tab fetching


class RController < ApplicationController
  def index
    @subreddit = '/r/' + params[:subreddit] if params[:subreddit]
  end

  def search
    @subreddit = '/r/' + params[:subreddit] if params[:subreddit]
  end
end

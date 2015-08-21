class RController < ApplicationController
  def index
    p "HI IM HERE #{params}"
    @posts = Post.all
  end
end

class RController < ApplicationController
  def index
    @posts = Post.all
  end
end

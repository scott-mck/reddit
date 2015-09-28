# TODO: Fetch correct sponsored posts

class RController < ApplicationController
  before_action :get_reddit_html

  def index
    @show_time_sort = true if %w(controversial top).include? params[:sort]
    @t = params[:t] || 'day'

    @subreddit = params[:subreddit] ? "/r/#{params[:subreddit]}/" : "/"
    @sort = params[:sort]
  end

  def get_reddit_html # TODO: make this async somehow (maybe?)
    @data = {}
    gold = Nokogiri::HTML(open('https://www.reddit.com')).css('.goldvertisement')
    @data[:gold_progress] = gold.css('.progress').css('p')[0].text
    @data[:prev_gold_progress] = gold.css('.history').css('.progress').css('p')[0].text
    @data[:time_to_midnight] = /\(.*\)/.match gold.css('.aside').css('p').text
    @data
  end

  def show

  end
end

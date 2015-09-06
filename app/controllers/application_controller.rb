require 'open-uri'

class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def get_reddit_html # TODO: make this async somehow (maybe?)
    data = {}
    gold = Nokogiri::HTML(open('https://www.reddit.com')).css('.goldvertisement')
    data[:gold_progress] = gold.css('.progress').css('p')[0].text
    data[:prev_gold_progress] = gold.css('.history').css('.progress').css('p')[0].text
    data[:time_to_midnight] = /\(.*\)/.match gold.css('.aside').css('p').text
    data
  end
end

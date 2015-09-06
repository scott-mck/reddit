require 'open-uri'

module ApplicationHelper
  def auth_token
    "<input type='hidden'
            name='authenticity_token'
            value='#{form_authenticity_token}'>"
    .html_safe
  end

  def subreddit_list
    %w(gadgets sports gaming pics worldnews videos askreddit aww music funny
       news movies books history food philosophy television jokes art diy space
       documentaries fitness askscience nottheonion todayilearned personalfinance
       gifs listentothis iama twoxchromosomes creepy nosleep getmotivated
       writingprompts lifeprotips earthporn explainlikeimfive showerthoughts
       futurology photoshopbattles mildlyinteresting dataisbeautiful tifu
       oldschoolcool upliftingnews internetisbeautiful science)
  end

  def dropdown_subreddits
    %w(announcements art askreddit askscience aww blog books creepy
       dataisbeautiful diy documentaries earthporn explainlikeimfive fitness
       food funny futurology gadgets gaming getmotivated gifs history iama
       internetisbeautiful jokes lifeprotips listentothis mildlyinteresting
       movies music news nosleep nottheonion oldschoolcool personalfinance
       philosophy photoshopbattles pics science showerthoughts space sports
       television tifu todayilearned twoxchromosomes upliftingnews videos
       worldnews videos worldnews writingprompts)
  end

  def get_gold_progress # TODO: make this async somehow (maybe?)
    gold = Nokogiri::HTML(open('https://www.reddit.com')).css('.goldvertisement')
    current = gold.css('.progress').css('p')[0].text
    yesterday = gold.css('.history').css('.progress').css('p')[0].text
    [current, yesterday]
  end
end

json.array! @posts do |post|
  json.extract! post, :id, :title, :picture_url, :link_url, :description, :votes
end

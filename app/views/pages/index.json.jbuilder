json.news @news do |node|
  json.partial! node

  json.images node.images do |image|
    json.partial! image
    json.path "#{image.attachment.host}styles/news_on_front/public/#{image.attachment.path}"
  end
end

json.sliders @sliders do |slider|
  json.partial! slider

  json.image do
    json.partial! slider.image
    json.path "#{slider.image.attachment.host}#{slider.image.attachment.path}"
  end
end

json.events @events do |event|
  json.partial! event
end

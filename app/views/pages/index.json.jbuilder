json.news @news do |node|
  json.partial! node
  json.desc node.desc if node.desc

  json.images node.images do |image|
    json.partial! image
    json.path "#{image.attachment.host}styles/news_on_front/public/#{image.attachment.path}"
  end
end

json.sliders @sliders do |slider|
  json.partial! slider

  if slider.dates
    json.dates slider.dates.value
  end

  json.image do
    json.partial! slider.image
    json.path "#{slider.image.attachment.host}#{slider.image.attachment.path}"
  end
end

json.events @events do |event|
  json.partial! event
  json.date event.date.value if event.date
end

json.news @news do |node|
  json.partial! node
  json.desc node.desc if node.desc

  json.images node.images do |image|
    json.partial! image
    json.path image.attachment.path
  end
end

json.sliders @sliders do |slider|
  json.partial! slider
  json.dates slider.dates.value if slider.dates

  json.image do
    json.partial! slider.image
    # json.path "#{slider.image.attachment.host}#{slider.image.attachment.path}"
    json.path slider.image.attachment.path
  end
end

json.events @events do |event|
  json.partial! event
  json.date event.date.value if event.date
end

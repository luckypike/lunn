json.news @news do |node|
  json.cache! [node.nid], expires_in: 30.minutes do
    json.partial! node
    json.desc node.desc if node.desc

    json.images node.images do |image|
      json.partial! image
      json.path image.attachment.path
    end
  end
end

json.sliders @sliders do |slider|
  json.cache! [slider.nid], expires_in: 30.minutes do

    json.partial! slider
    json.dates slider.dates.value if slider.dates

    json.image do
      json.partial! slider.image
      json.path slider.image.attachment.path
    end
  end
end

json.events @events do |event|
  json.cache! [event.nid], expires_in: 30.minutes do
    json.partial! event
    json.date event.date.value if event.date
  end
end

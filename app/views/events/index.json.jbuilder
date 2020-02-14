json.events @events do |event|
  json.partial! event
  json.date event.date.value if event.date
end

json.feed @feed do |f|
  json.partial! f
  json.date f.date.value if f.date
end

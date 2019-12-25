json.events @events do |event|
  json.partial! event
  json.date event.date.value if event.date
end

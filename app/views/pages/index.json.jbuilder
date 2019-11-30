json.news @news do |node|
  json.partial! node
end

json.events @events do |event|
  json.partial! event
end

json.news @news do |node|
  json.partial! node
  json.date node.created

  json.images node.images do |image|
    json.partial! image
  end
end

json.events @events do |event|
  json.partial! event
end

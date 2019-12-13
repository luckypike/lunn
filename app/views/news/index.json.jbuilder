json.news @news do |node|
  json.partial! node

  json.date node.created
  json.text node.text
  json.desc node.desc

  json.images node.images do |image|
    json.partial! image
  end
end

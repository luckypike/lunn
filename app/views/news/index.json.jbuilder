json.news @news do |node|
  json.partial! node

  json.date node.created
  json.desc node.desc

  json.images node.images do |image|
    json.partial! image
    json.path "#{image.attachment.host}styles/news_on_front/public/#{image.attachment.path}"
  end
end

json.total @total

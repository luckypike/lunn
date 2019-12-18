json.node do
  json.partial! @node
  json.text @node.text

  json.images @node.images do |image|
    json.partial! image
    json.path "#{image.attachment.host}styles/news_on_front/public/#{image.attachment.path}"
  end
end

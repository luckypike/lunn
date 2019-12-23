json.node do
  json.partial! @node
  json.text @node.text

  json.images @node.images do |image|
    json.partial! image
    json.path "#{image.attachment.host}styles/embedded_main/public/#{image.attachment.path}"
  end
end

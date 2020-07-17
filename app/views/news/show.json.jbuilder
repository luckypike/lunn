json.node do
  json.partial! @node
  json.text @node.text

  json.docs @node.docs do |doc|
    json.partial! doc
  end

  json.images @node.images do |image|
    json.partial! image
    json.width image.field_multiple_image_width
    json.height image.field_multiple_image_height
    json.path image.attachment.path
    json.encoded_path image.attachment.encoded_path
  end
end

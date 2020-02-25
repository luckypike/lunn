json.node do
  json.partial! @node
  json.text @node.text

  json.docs @node.docs do |doc|
    json.fid doc.fid
    json.path doc.path
    json.title doc.title
    json.wrapper doc.wrapper
    json.size doc.size
    json.mime doc.mime
    json.filename doc.filename
  end

  json.images @node.images do |image|
    json.partial! image
    json.width image.field_multiple_image_width
    json.height image.field_multiple_image_height
    json.path image.attachment.path
  end
end

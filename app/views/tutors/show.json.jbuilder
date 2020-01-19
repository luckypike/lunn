json.node do
  json.extract! @node, :id, :title, :text, :desc

  json.image do
    json.partial! @node.image
    json.path "#{@node.image.attachment.host}#{@node.image.attachment.path}"
  end
end

json.node do
  json.extract! @node, :id, :title

  json.extract! @node, :tutor_edu, :tutor_qual, :tutor_works

  json.image do
    json.partial! @node.image
    json.path "#{@node.image.attachment.host}#{@node.image.attachment.path}"
  end
end

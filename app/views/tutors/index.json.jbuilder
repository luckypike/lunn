json.tutors @tutors do |tutor|
  json.extract! tutor, :id, :title

  json.image do
    json.partial! tutor.image
    json.path "#{tutor.image.attachment.host}#{tutor.image.attachment.path}"
  end
end

json.node @node, :id, :title

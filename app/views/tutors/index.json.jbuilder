json.tutors @tutors.sort_by(&:title) do |tutor|
  json.extract! tutor, :id, :title

  if tutor.image
    json.image do
      json.partial! tutor.image
      # json.path "#{tutor.image.attachment.host}#{tutor.image.attachment.path}"
      json.path tutor.image.attachment.path
    end
  end
end

json.node @node, :id, :title

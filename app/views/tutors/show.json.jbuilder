json.node do
  json.extract! @node, :id, :title

  json.extract! @node, :position, :tutor_edu, :tutor_qual, :tutor_adegree, :tutor_atitle, :tutor_school, :tutor_direction, :tutor_time, :tutor_stime, :tutor_works, :tutor_conferences, :tutor_directions, :tutor_retraining, :tutor_special, :tutor_phone, :tutor_email, :tutor_consult

  if @node.image
    json.image do
      json.partial! @node.image
      # json.path "#{@node.image.attachment.host}#{@node.image.attachment.path}"
      json.path @node.image.attachment.path
    end
  end
end

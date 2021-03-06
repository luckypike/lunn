json.node do
  json.extract! @tutor, :id, :title

  json.extract! @tutor, :position, :tutor_edu, :tutor_qual, :tutor_adegree, :tutor_atitle, :tutor_school, :tutor_direction, :tutor_time, :tutor_stime, :tutor_works, :tutor_conferences, :tutor_directions, :tutor_retraining, :tutor_special, :tutor_phone, :tutor_email, :tutor_consult

  json.text @tutor.text

  if @tutor.image
    json.image do
      json.partial! @tutor.image
      # json.path "#{@node.image.attachment.host}#{@node.image.attachment.path}"
      json.path @tutor.image.attachment.path
      json.encoded_path @tutor.image.attachment.encoded_path
    end
  end
end

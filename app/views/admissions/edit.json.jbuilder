json.admission do
  json.partial! @admission
end

json.values do
  %i[identity document parents address residence school score course].each do |section|
    Admission.stored_attributes[section].each do |key|
      json.set! "#{section}_#{key}", @admission.send("#{section}_#{key}").presence || ''
    end
  end

  json.state Admission.states.keys[Admission.states.keys.index(@admission.state) + 1]

  json.subjects_attributes @admission.subjects.each do |subject|
    json.extract! subject, :id, :admission_subject_id, :ege, :grade
  end

  json.document_ids @admission.documents.pluck(:id)

  json.documents_attributes @admission.documents do |document|
    json.extract! document, :id, :title, :uuid, :section
  end

  json.directions_attributes @admission.directions do |direction|
    json.extract! direction, :id, :admission_direction_id, :form, :basis
  end
end

json.partial! 'dictionaries'

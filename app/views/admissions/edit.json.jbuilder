json.admission do
  json.partial! @admission
  json.extract! @admission, :step_prev, :step_next
end

json.values do
  %i[identity document parents address residence school score course features].each do |section|
    Admission.stored_attributes[section].each do |key|
      json.set! "#{section}_#{key}", @admission.send("#{section}_#{key}").presence || ''
    end
  end

  %i[agreements].each do |section|
    Admission.stored_attributes[section].each do |key|
      json.set! "#{section}_#{key}", @admission.send("#{section}_#{key}").presence || false
    end
  end

  json.state Admission.states.keys[Admission.states.keys.index(@admission.state) + 1]

  json.subject_ids @admission.subjects.pluck(:id)

  json.subjects_attributes @admission.subjects.each do |subject|
    json.extract! subject, :id, :subject, :ege, :grade, :year
  end

  json.document_ids @admission.documents.pluck(:id)

  json.documents_attributes @admission.documents do |document|
    json.partial! document
  end

  json.directions_attributes @admission.directions do |direction|
    json.extract! direction, :id, :course_id, :form, :basis
  end
end

json.partial! 'dictionaries'

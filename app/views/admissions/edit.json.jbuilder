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
    json.id subject.id
    json.subject_id subject.subject_id
    json.ege subject.ege
    json.grade subject.grade
  end
end

json.partial! 'dictionaries'

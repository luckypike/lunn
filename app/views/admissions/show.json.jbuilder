json.admission do
  json.partial! @admission

  json.subjects @admission.subjects.each do |subject|
    json.extract! subject, :subject, :ege, :grade
  end

  json.directions @admission.directions.each do |subject|
    json.extract! subject, :course_id, :basis, :form
  end
end

json.partial! 'dictionaries'

json.admission do
  json.partial! @admission
end

json.values do
  json.extract! @admission, :identity_first_name, :identity_last_name,
    :identity_middle_name, :identity_sex, :identity_birth_date, :identity_birth_place,
    :document_nationality, :document_type, :document_series, :document_number,
    :document_issued_by, :document_issue_date

  json.state Admission.states.keys[Admission.states.keys.index(@admission.state) + 1]
end

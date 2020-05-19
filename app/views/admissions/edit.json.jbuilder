json.admission do
  json.partial! @admission
end

json.values do
  json.extract! @admission, :identity_first_name, :identity_last_name,
    :identity_middle_name, :identity_sex, :identity_birth_date, :identity_birth_place,
    :document_nationality, :document_type, :document_series, :document_number,
    :document_issued_by, :document_issue_date,
    :parents_relation_degree, :parents_name, :parents_phone,
    :address_country, :address_region, :address_district, :address_city,
    :address_locality, :address_index, :address_street, :address_house,
    :address_building, :address_apartment, :address_email, :address_mobile, :address_phone,
    :school_type, :school_name, :school_graduation, :school_address,
    :school_education, :school_document_type, :school_document_number,
    :school_document_id, :school_document_date, :school_diploma_type,
    :school_merit, :school_language,
    :score_subject, :score_ege, :score_grade, :score_year, :score_achievements

  json.state Admission.states.keys[Admission.states.keys.index(@admission.state) + 1]
end

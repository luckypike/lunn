json.admission do
  json.partial! @admission
end

json.values do
  json.extract! @admission, :identity_first_name, :identity_last_name,
    :identity_middle_name

  json.state Admission.states.keys[Admission.states.keys.index(@admission.state) + 1]
end

json.extract! admission, :id, :state, :number, :status
json.state_key admission.state_before_type_cast

%i[identity document parents address residence school score course features].each do |section|
  Admission.stored_attributes[section].each do |key|
    json.set! "#{section}_#{key}", admission.send("#{section}_#{key}").presence || ''
  end
end

json.documents admission.documents do |document|
  json.extract! document, :id, :title, :uuid, :section, :file_url
end

json.states Admission.states

json.extract! admission, :state

%i[identity document parents address residence school score course].each do |section|
  Admission.stored_attributes[section].each do |key|
    json.set! "#{section}_#{key}", @admission.send("#{section}_#{key}").presence || ''
  end
end

json.documents @admission.documents do |document|
  json.extract! document, :id, :title, :uuid, :section
end

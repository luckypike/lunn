json.list @list do |row|
  json.cache! row[:id], expires_in: 1.hour do
    json.extract! row, :id, :family
  # json.id row[:id]
  # json.family row[:family]
  end
end

json.dictionaries do
  json.citizenships Citizenship.all, :id, :label
end

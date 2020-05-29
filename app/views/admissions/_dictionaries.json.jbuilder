json.dictionaries do
  json.citizenships Citizenship.all, :id, :label
  json.subjects Subject.all, :id, :label
  json.achievements Achievement.all, :id, :label
end

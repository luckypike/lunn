json.dictionaries do
  json.citizenships Citizenship.all, :id, :label
  json.subjects Subject.all, :id, :label
  json.achievements Achievement.all, :id, :label
  json.directions Direction.all, :id, :label
end

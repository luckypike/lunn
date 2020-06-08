json.admissions @admissions.select(&:filling?) do |admission|
  json.partial! admission
end

json.not_filling @admissions.reject(&:filling?) do |admission|
  json.partial! admission
end

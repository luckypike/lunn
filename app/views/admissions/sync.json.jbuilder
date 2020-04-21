json.admissions @admissions do |admission|
  json.extract! admission, :id, :first_name, :middle_name, :last_name
end

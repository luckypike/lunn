json.dictionaries do
  json.citizenships AdmissionCitizenship.all, :id, :label
  json.subjects AdmissionSubject.all, :id, :label
  json.achievements AdmissionAchievement.all, :id, :label
  json.directions AdmissionDirection.all, :id, :label
end

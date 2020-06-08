json.dictionaries do
  json.citizenships AdmissionCitizenship.all.sort_by { |c| [c.title] }.sort_by { |c| [c.id == 643 ? 0 : 1, c] }, :id, :label
  json.subjects AdmissionSubject.all, :id, :label
  json.achievements AdmissionAchievement.all, :id, :label
  json.directions AdmissionDirection.all, :id, :label
end

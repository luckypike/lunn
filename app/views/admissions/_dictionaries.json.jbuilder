json.dictionaries do
  json.citizenships AdmissionCitizenship.all.sort_by { |c| [c.title] }.sort_by { |c| [c.id == 643 ? 0 : 1, c] }, :id, :label
  json.subjects AdmissionSubject.all, :id, :label
  json.achievements AdmissionAchievement.all, :id, :label
  json.directions Node::Course.where(type: :course).includes(:field_spec, :field_level, :field_course_code).sort_by(&:title_sort) do |course|
    json.extract! course, :id, :title, :spec, :level, :course_code, :time_1, :time_2, :time_3
    json.label "#{t("courses.levels.#{course.level}")}. #{course.title} (#{course.course_code}) #{course.spec ? ". #{course.spec}" : ''}"
  end
end

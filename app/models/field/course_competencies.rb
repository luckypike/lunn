class Field::CourseCompetencies < ApplicationRecord
  self.table_name = 'field_data_field_course_competencies'

  def value
    field_course_competencies_value
  end
end

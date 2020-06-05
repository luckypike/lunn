class Field::CourseExams < ApplicationRecord
  self.table_name = 'field_data_field_course_exams'

  def value
    field_course_exams_value
  end
end

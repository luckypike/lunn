class Field::CourseCode < ApplicationRecord
  self.table_name = 'field_data_field_course_code'

  def value
    field_course_code_value
  end
end

class Field::CourseDisciplines < ApplicationRecord
  self.table_name = 'field_data_field_course_disciplines'

  def value
    field_course_disciplines_value
  end
end

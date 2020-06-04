class Field::CourseSummary < ApplicationRecord
  self.table_name = 'field_data_field_course_summary'

  def value
    field_course_summary_value
  end
end

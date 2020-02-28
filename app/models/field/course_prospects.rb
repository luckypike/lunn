class Field::CourseProspects < ApplicationRecord
  self.table_name = 'field_data_field_course_prospects'

  def value
    field_course_prospects_value
  end
end

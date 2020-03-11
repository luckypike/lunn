class Field::CourseFeatures < ApplicationRecord
  self.table_name = 'field_data_field_course_features'

  def value
    field_course_features_value
  end
end

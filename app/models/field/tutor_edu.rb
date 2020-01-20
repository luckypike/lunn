class Field::TutorEdu < ApplicationRecord
  self.table_name = 'field_data_field_tutor_edu'

  def value
    field_tutor_edu_value
  end
end

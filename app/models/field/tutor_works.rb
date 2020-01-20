class Field::TutorWorks < ApplicationRecord
  self.table_name = 'field_data_field_tutor_works'

  def value
    field_tutor_works_value
  end
end

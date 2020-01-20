class Field::TutorSpecial < ApplicationRecord
  self.table_name = 'field_data_field_tutor_special'

  def value
    field_tutor_special_value
  end
end

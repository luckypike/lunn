class Field::TutorDirection < ApplicationRecord
  self.table_name = 'field_data_field__tutor_direction'

  def value
    field__tutor_direction_value
  end
end

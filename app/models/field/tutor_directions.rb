class Field::TutorDirections < ApplicationRecord
  self.table_name = 'field_data_field_tutor_directions'

  def value
    field_tutor_directions_value
  end
end

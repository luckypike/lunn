class Field::Position < ApplicationRecord
  self.table_name = 'field_data_field_position'

  def value
    field_position_value
  end
end

class Field::Level < ApplicationRecord
  self.table_name = 'field_data_field_level'

  def value
    field_level_value
  end
end

class Field::Time1 < ApplicationRecord
  self.table_name = 'field_data_field_time_1'

  def value
    field_time_1_value
  end
end

class Field::Time2 < ApplicationRecord
  self.table_name = 'field_data_field_time_2'

  def value
    field_time_2_value&.to_f
  end
end

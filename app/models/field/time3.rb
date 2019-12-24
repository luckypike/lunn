class Field::Time3 < ApplicationRecord
  self.table_name = 'field_data_field_time_3'

  def value
    field_time_3_value
  end
end

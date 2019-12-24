class Field::Price3 < ApplicationRecord
  self.table_name = 'field_data_field_price_3'

  def value
    field_price_3_value
  end
end

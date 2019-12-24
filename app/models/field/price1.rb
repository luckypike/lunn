class Field::Price1 < ApplicationRecord
  self.table_name = 'field_data_field_price_1'

  def value
    field_price_1_value
  end
end

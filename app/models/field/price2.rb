class Field::Price2 < ApplicationRecord
  self.table_name = 'field_data_field_price_2'

  def value
    field_price_2_value
  end
end

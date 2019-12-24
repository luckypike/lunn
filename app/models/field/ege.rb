class Field::Ege < ApplicationRecord
  self.table_name = 'field_data_field_ege'

  def value
    field_ege_value
  end
end

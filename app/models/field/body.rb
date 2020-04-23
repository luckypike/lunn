class Field::Body < ApplicationRecord
  self.table_name = 'field_data_field_body'

  def value
    field_body_value
  end
end

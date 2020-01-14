class Field::Body < ApplicationRecord
  self.table_name = 'field_data_body'

  def value
    body_value
  end
end

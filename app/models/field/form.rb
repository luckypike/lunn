class Field::Form < ApplicationRecord
  self.table_name = 'field_data_field_form'

  def value
    field_form_value
  end
end

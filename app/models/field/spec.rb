class Field::Spec < ApplicationRecord
  self.table_name = 'field_data_field_spec'

  def value
    field_spec_value
  end
end

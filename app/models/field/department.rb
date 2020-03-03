class Field::Department < ApplicationRecord
  self.table_name = 'field_data_field_department'

  def value
    field_department_target_id
  end
end

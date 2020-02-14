class Field::TutorType < ApplicationRecord
  self.table_name = 'field_data_field_tutor_type'

  def value
    field_tutor_type_value
  end
end

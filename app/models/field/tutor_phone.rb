class Field::TutorPhone < ApplicationRecord
  self.table_name = 'field_data_field_tutor_phone'

  def value
    field_tutor_phone_value
  end
end

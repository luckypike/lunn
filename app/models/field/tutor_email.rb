class Field::TutorEmail < ApplicationRecord
  self.table_name = 'field_data_field_tutor_email'

  def value
    field_tutor_email_value
  end
end

class Field::TutorConsult < ApplicationRecord
  self.table_name = 'field_data_field_tutor_consult'

  def value
    field_tutor_consult_value
  end
end

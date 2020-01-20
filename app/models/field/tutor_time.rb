class Field::TutorTime < ApplicationRecord
  self.table_name = 'field_data_field_tutor_time'

  def value
    field_tutor_time_value
  end
end

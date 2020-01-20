class Field::TutorStime < ApplicationRecord
  self.table_name = 'field_data_field_tutor_stime'

  def value
    field_tutor_stime_value
  end
end

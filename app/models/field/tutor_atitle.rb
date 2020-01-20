class Field::TutorAtitle < ApplicationRecord
  self.table_name = 'field_data_field_tutor_atitle'

  def value
    field_tutor_atitle_value
  end
end

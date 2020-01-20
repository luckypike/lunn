class Field::TutorConferences < ApplicationRecord
  self.table_name = 'field_data_field_tutor_conferences'

  def value
    field_tutor_conferences_value
  end
end

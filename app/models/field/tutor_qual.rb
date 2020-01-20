class Field::TutorQual < ApplicationRecord
  self.table_name = 'field_data_field_tutor_qual'

  def value
    field_tutor_qual_value
  end
end

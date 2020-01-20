class Field::TutorAdegree < ApplicationRecord
  self.table_name = 'field_data_field_tutor_adegree'

  def value
    field_tutor_adegree_value
  end
end

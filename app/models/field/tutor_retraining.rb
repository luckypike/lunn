class Field::TutorRetraining < ApplicationRecord
  self.table_name = 'field_data_field_tutor_retraining'

  def value
    field_tutor_retraining_value
  end
end

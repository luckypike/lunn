class Field::TutorSchool < ApplicationRecord
  self.table_name = 'field_data_field_tutor_school'

  def value
    field_tutor_school_value
  end
end

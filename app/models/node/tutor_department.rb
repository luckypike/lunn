class Node::TutorDepartment < ApplicationRecord
  self.table_name = 'field_data_field_tutor_department'

  belongs_to :department, -> { where(entity_type: :node) }, foreign_key: :field_tutor_department_target_id
  belongs_to :tutor, foreign_key: :entity_id
end

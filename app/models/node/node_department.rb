class Node::NodeDepartment < ApplicationRecord
  self.table_name = 'field_data_field_department'

  belongs_to :node, -> { where(entity_type: :node) }, foreign_key: :field_department_target_id, inverse_of: :departments
  belongs_to :node_tutor, foreign_key: :entity_id, class_name: 'Node', inverse_of: :tutors
end

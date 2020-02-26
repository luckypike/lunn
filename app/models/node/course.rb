class Node::Course < ApplicationRecord
  self.table_name = 'field_data_field_courses'

  belongs_to :node, -> { where(entity_type: :node) }, foreign_key: :field_courses_target_id, inverse_of: :courses
  belongs_to :teacher, foreign_key: :entity_id, class_name: 'Node', inverse_of: :teachers
end

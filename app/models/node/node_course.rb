class Node::NodeCourse < ApplicationRecord
  self.table_name = 'field_data_field_courses'

  belongs_to :node, -> { where(entity_type: :node) }, foreign_key: :field_courses_target_id
  belongs_to :tutors, foreign_key: :entity_id, class_name: 'Node::Tutor'
end

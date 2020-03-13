class Node::NodeDivision < ApplicationRecord
  self.table_name = 'field_data_field_division'

  belongs_to :node, -> { where(entity_type: :node) }, foreign_key: :field_division_target_id
  belongs_to :division_course, foreign_key: :entity_id, class_name: 'Node'
end

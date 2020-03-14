class Node::NodeUgsn < ApplicationRecord
  self.table_name = 'field_data_field_ugsn'

  belongs_to :node, -> { where(entity_type: :node) }, foreign_key: :field_ugsn_target_id
  belongs_to :ugsn_course, foreign_key: :entity_id, class_name: 'Node'
end

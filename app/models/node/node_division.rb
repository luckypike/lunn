class Node::NodeDivision < ApplicationRecord
  self.table_name = 'field_data_field_division'

  belongs_to :node, foreign_key: :field_division_target_id
  belongs_to :course, foreign_key: :entity_id
  belongs_to :department, foreign_key: :entity_id
end

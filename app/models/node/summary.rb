class Node::Summary < ApplicationRecord
  self.table_name = 'field_data_field_summary'

  belongs_to :node, foreign_key: :entity_id, inverse_of: :summary
end

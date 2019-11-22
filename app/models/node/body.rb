class Node::Body < ApplicationRecord
  self.table_name = 'field_data_field_body'

  belongs_to :node, foreign_key: :entity_id, inverse_of: :body
end

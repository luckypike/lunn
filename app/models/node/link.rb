class Node::Link < ApplicationRecord
  self.table_name = 'field_data_field_link'

  belongs_to :node, foreign_key: :entity_id, inverse_of: :link

  def value
    field_link_url
  end
end

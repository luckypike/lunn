class Node::MenuOpen < ApplicationRecord
  self.table_name = 'field_data_field_menu_open'
  self.primary_key = 'entity_id'

  belongs_to :node, foreign_key: :entity_id, inverse_of: :menu_open

  def value
    field_menu_open_value
  end
end

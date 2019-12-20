class Node::Date < ApplicationRecord
  self.table_name = 'field_data_field_date_begin'

  belongs_to :node, foreign_key: :entity_id, inverse_of: :date

  def value
    field_date_begin_value
  end
end

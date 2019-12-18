class Node::Dates < ApplicationRecord
  self.table_name = 'field_data_field_dates'

  belongs_to :node, foreign_key: :entity_id, inverse_of: :dates

  def value
    field_dates_value
  end
end

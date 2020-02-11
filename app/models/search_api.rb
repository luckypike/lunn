class SearchApi < ApplicationRecord
  self.table_name = 'search_api_db_default_node_index_text'

  belongs_to :node, foreign_key: :item_id
end

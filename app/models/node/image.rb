class Node::Image < ApplicationRecord
  self.table_name = 'field_data_field_multiple_image'

  belongs_to :attachment, foreign_key: :field_multiple_image_fid
  belongs_to :node, -> { where(entity_type: :node) }, foreign_key: :entity_id, inverse_of: :images
end

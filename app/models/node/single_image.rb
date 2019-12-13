class Node::SingleImage < ApplicationRecord
  self.table_name = 'field_data_field_single_image'

  belongs_to :attachment, foreign_key: :field_single_image_fid
  belongs_to :node, -> { where(entity_type: :node) }, foreign_key: :entity_id, inverse_of: :image
end

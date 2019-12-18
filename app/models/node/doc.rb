class Node::Doc < ApplicationRecord
  self.table_name = 'field_data_field_attachment'

  belongs_to :attachment, -> { includes(:attachment_wrapper) }, foreign_key: :field_attachment_fid
  belongs_to :node, -> { where(entity_type: :node) }, foreign_key: :entity_id, inverse_of: :docs

  delegate :path, to: :attachment
  delegate :fid, to: :attachment
  delegate :wrapper, to: :attachment

  def title
    field_attachment_description
  end
end

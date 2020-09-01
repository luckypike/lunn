class Node::Doc < ApplicationRecord
  self.table_name = 'field_data_field_attachment'
  self.primary_key = 'field_attachment_fid'

  default_scope { order(delta: :asc).where(field_attachment_display: 1) }

  belongs_to :attachment, -> { includes(:attachment_wrapper) }, foreign_key: :field_attachment_fid
  belongs_to :node, -> { where(entity_type: :node) }, foreign_key: :entity_id, inverse_of: :docs

  delegate :path, to: :attachment
  delegate :fid, to: :attachment
  delegate :wrapper, to: :attachment
  delegate :filename, to: :attachment

  def title
    field_attachment_description
  end

  def size
    attachment.filesize
  end

  def mime
    attachment.filemime
  end

  def display
    field_attachment_display
  end
end

class Node::Image < ApplicationRecord
  self.table_name = 'field_data_field_multiple_image'

  belongs_to :attachment, foreign_key: :field_multiple_image_fid
  belongs_to :node, -> { where(entity_type: :node) }, foreign_key: :entity_id, inverse_of: :images

  def fid
    attachment.fid
  end

  def filemime
    attachment.filemime
  end

  def filesize
    attachment.filesize
  end

  def type
    attachment.type
  end

  def path
    attachment.path
  end

  def width
    field_multiple_image_width
  end

  def height
    field_multiple_image_height
  end
end

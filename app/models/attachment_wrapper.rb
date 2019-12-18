class AttachmentWrapper < ApplicationRecord
  self.table_name = 'field_data_field_wrapper_class'

  belongs_to :attachment, -> { where(entity_type: :file) }, foreign_key: :entity_id, inverse_of: :attachment_wrapper

  def value
    field_wrapper_class_value
  end
end

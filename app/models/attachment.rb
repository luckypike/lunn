class Attachment < ApplicationRecord
  self.table_name = 'file_managed'
  self.inheritance_column = :_type_disabled

  has_one :attachment_wrapper, -> { where(entity_type: :file) }, dependent: :destroy, foreign_key: :entity_id, inverse_of: :attachment

  def path
    uri.gsub('public://', '')
  end

  def host
    'http://www.lunn.ru/sites/default/files/'
  end

  def wrapper
    attachment_wrapper&.value
  end
end

class Attachment < ApplicationRecord
  self.table_name = 'file_managed'
  self.inheritance_column = :_type_disabled

  has_one :attachment_wrapper, -> { where(entity_type: :file) }, dependent: :destroy, foreign_key: :entity_id, inverse_of: :attachment

  def path
    uri.gsub('public://', '/')
  end

  def encoded_path
    Base64.urlsafe_encode64(path.gsub('/media', 'local://')).tr('=', '').scan(/.{1,16}/).join('/')
  end

  def host
    'https://assets.lunn.ru'
  end

  def wrapper
    attachment_wrapper&.value
  end
end

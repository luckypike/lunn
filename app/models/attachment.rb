class Attachment < ApplicationRecord
  self.table_name = 'file_managed'
  self.inheritance_column = :_type_disabled


  def path
    uri.gsub('public://', '')
  end

  def host
    'http://www.lunn.ru/sites/default/files/'
  end
end

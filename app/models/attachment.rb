class Attachment < ApplicationRecord
  self.table_name = 'file_managed'
  self.inheritance_column = :_type_disabled


  def path
    uri.gsub('public://', 'http://www.lunn.ru/sites/default/files/styles/news_on_front/public/')
  end
end

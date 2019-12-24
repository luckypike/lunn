class Field::Youtube < ApplicationRecord
  self.table_name = 'field_data_field_youtube'

  def value
    field_youtube_value
  end
end

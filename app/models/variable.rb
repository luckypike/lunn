class Variable < ApplicationRecord
  self.table_name = 'variable'

  after_find do
    self.value = PHP.unserialize(value).force_encoding('utf-8')
  end
end

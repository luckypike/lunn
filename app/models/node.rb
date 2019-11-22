class Node < ApplicationRecord
  self.table_name = 'node'
  self.inheritance_column = :_type_disabled
  self.ignored_columns = %w[changed]
end

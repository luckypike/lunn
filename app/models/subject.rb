class Subject < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary }

  def label
    title
  end
end

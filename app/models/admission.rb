class Admission < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary }

  belongs_to :user
end

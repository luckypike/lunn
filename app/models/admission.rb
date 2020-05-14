class Admission < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary }

  enum state: { one: 1, two: 2, three: 3, done: 99 }

  belongs_to :user
end

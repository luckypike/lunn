class UserRole < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary }

  enum role: { teacher: 1, admissioner: 2, editor: 3 }

  belongs_to :user

  validates :role, presence: true
end

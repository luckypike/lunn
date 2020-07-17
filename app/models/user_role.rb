class UserRole < ApplicationRecordPrimary
  enum role: { tutor: 1, admissioner: 2, editor: 3 }

  belongs_to :user

  validates :role, presence: true
end

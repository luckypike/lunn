class Tutor < ApplicationRecordPrimary
  belongs_to :user

  validates :first_name, :middle_name, :last_name, presence: true
  validates :position, presence: true
end

class Tutor < ApplicationRecordPrimary
  belongs_to :user
  has_one_attached :photo

  validates :first_name, :middle_name, :last_name, presence: true
  validates :position, presence: true
end

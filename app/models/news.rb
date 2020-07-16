class News < ApplicationRecordPrimary
  belongs_to :user

  has_many_attached :images

  validates :title, presence: true
end

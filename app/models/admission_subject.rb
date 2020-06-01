class AdmissionSubject < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary }

  belongs_to :admission
  belongs_to :subject

  validates :ege, presence: true
end

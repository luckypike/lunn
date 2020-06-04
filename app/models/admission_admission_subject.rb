class AdmissionAdmissionSubject < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary }

  belongs_to :admission
  belongs_to :admission_subject

  validates :ege, presence: true
end

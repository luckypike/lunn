class AdmissionAdmissionSubject < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary }

  belongs_to :admission

  validates :subject, :ege, :grade, presence: true

  validates :ege, numericality: { only_integer: true, less_than_or_equal_to: 100, greater_than_or_equal_to: 0 }

  validates :grade, numericality: { only_integer: true, less_than_or_equal_to: 5, greater_than_or_equal_to: 3 }
end

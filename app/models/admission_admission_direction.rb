class AdmissionAdmissionDirection < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary }

  belongs_to :admission
  belongs_to :admission_direction

  validates :form, :basis, presence: true
end

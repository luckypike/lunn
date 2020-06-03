class AdmissionDocument < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary }

  mount_uploader :file, DocumentUploader

  belongs_to :assignable, polymorphic: true, optional: true
end

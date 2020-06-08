class AdmissionAdmissionDirection < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary }

  belongs_to :admission
  belongs_to :course, class_name: 'Node::Course', foreign_key: :course_id, inverse_of: :admission_courses

  validates :form, :basis, presence: true
end

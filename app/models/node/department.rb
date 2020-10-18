class Node::Department < Node
  has_many :tutor_departments, foreign_key: :field_tutor_department_target_id, dependent: :destroy
  has_many :tutors, -> { published.order(title: :asc) }, through: :tutor_departments
end

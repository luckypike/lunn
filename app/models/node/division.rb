class Node::Division < Node
  default_scope { where(type: :division) }

  has_many :node_divisions, -> { where(entity_type: :node) }, dependent: :destroy, foreign_key: :field_division_target_id
  has_many :courses, -> { where(field_data_field_division: { bundle: :course }) }, through: :node_divisions
  has_many :departments, -> { where(field_data_field_division: { bundle: :department }) }, through: :node_divisions
end

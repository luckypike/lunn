class Node::Tutor < Node
  default_scope { where(type: :employee).order(title: :asc) }

  has_many :field_tutor_types, -> { where(entity_type: :node) }, class_name: 'Field::TutorType', foreign_key: :entity_id
  has_one :field_position, -> { where(entity_type: :node) }, class_name: 'Field::Position', foreign_key: :entity_id
  has_one :field_tutor_edu, -> { where(entity_type: :node) }, class_name: 'Field::TutorEdu', foreign_key: :entity_id
  has_one :field_tutor_qual, -> { where(entity_type: :node) }, class_name: 'Field::TutorQual', foreign_key: :entity_id
  has_one :field_tutor_adegree, -> { where(entity_type: :node) }, class_name: 'Field::TutorAdegree', foreign_key: :entity_id
  has_one :field_tutor_atitle, -> { where(entity_type: :node) }, class_name: 'Field::TutorAtitle', foreign_key: :entity_id
  has_one :field_tutor_school, -> { where(entity_type: :node) }, class_name: 'Field::TutorSchool', foreign_key: :entity_id
  has_one :field__tutor_direction, -> { where(entity_type: :node) }, class_name: 'Field::TutorDirection', foreign_key: :entity_id
  has_one :field_tutor_time, -> { where(entity_type: :node) }, class_name: 'Field::TutorTime', foreign_key: :entity_id
  has_one :field_tutor_stime, -> { where(entity_type: :node) }, class_name: 'Field::TutorStime', foreign_key: :entity_id
  has_many :field_tutor_works, -> { where(entity_type: :node) }, class_name: 'Field::TutorWorks', foreign_key: :entity_id
  has_many :field_tutor_conferences, -> { where(entity_type: :node) }, class_name: 'Field::TutorConferences', foreign_key: :entity_id
  has_many :field_tutor_directions, -> { where(entity_type: :node) }, class_name: 'Field::TutorDirections', foreign_key: :entity_id
  has_many :field_tutor_retraining, -> { where(entity_type: :node) }, class_name: 'Field::TutorRetraining', foreign_key: :entity_id
  has_many :field_tutor_special, -> { where(entity_type: :node) }, class_name: 'Field::TutorSpecial', foreign_key: :entity_id
  has_one :field_tutor_phone, -> { where(entity_type: :node) }, class_name: 'Field::TutorPhone', foreign_key: :entity_id
  has_one :field_tutor_email, -> { where(entity_type: :node) }, class_name: 'Field::TutorEmail', foreign_key: :entity_id
  has_one :field_tutor_consult, -> { where(entity_type: :node) }, class_name: 'Field::TutorConsult', foreign_key: :entity_id
  has_one :field_department, -> { where(entity_type: :node) }, class_name: 'Field::Department', foreign_key: :entity_id

  def department
    field_department&.value
  end

  def position
    field_position&.value
  end

  def tutor_edu
    field_tutor_edu&.value
  end

  def tutor_qual
    field_tutor_qual&.value
  end

  def tutor_adegree
    field_tutor_adegree&.value
  end

  def tutor_atitle
    field_tutor_atitle&.value
  end

  def tutor_school
    field_tutor_school&.value
  end

  def tutor_direction
    field__tutor_direction&.value
  end

  def tutor_time
    field_tutor_time&.value
  end

  def tutor_stime
    field_tutor_stime&.value
  end

  def tutor_works
    field_tutor_works.map(&:value)
  end

  def tutor_conferences
    field_tutor_conferences.map(&:value)
  end

  def tutor_directions
    field_tutor_directions.map(&:value)
  end

  def tutor_types
    field_tutor_types.map(&:value)
  end

  def tutor_retraining
    field_tutor_retraining.map(&:value)
  end

  def tutor_special
    field_tutor_special.map(&:value)
  end

  def tutor_phone
    field_tutor_phone&.value
  end

  def tutor_email
    field_tutor_email&.value
  end

  def tutor_consult
    field_tutor_consult&.value
  end

  def chief?
    tutor_types.to_set.intersect?([1, 9].to_set)
  end

  def tutor_phone_public
    tutor_phone if chief?
  end

  def tutor_email_public
    tutor_email if chief?
  end

  def url
    "/tutors/#{nid}"
  end

  class << self
    def with_tutor_fields
      includes(
        :field_tutor_edu, :field_tutor_qual,
        :field_tutor_works
      )
    end
  end
end

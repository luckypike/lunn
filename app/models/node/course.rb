class Node::Course < Node
  has_many :node_courses, foreign_key: :field_courses_target_id, dependent: :destroy
  has_many :tutors, through: :node_courses

  has_one :field_price_1, -> { where(entity_type: :node) },
    class_name: 'Field::Price1', foreign_key: :entity_id

  has_one :field_price_2, -> { where(entity_type: :node) },
    class_name: 'Field::Price2', foreign_key: :entity_id

  has_one :field_price_3, -> { where(entity_type: :node) },
    class_name: 'Field::Price3', foreign_key: :entity_id

  has_one :field_time_1, -> { where(entity_type: :node) }, class_name: 'Field::Time1', foreign_key: :entity_id
  has_one :field_time_2, -> { where(entity_type: :node) }, class_name: 'Field::Time2', foreign_key: :entity_id
  has_one :field_time_3, -> { where(entity_type: :node) }, class_name: 'Field::Time3', foreign_key: :entity_id

  has_one :field_places_1, -> { where(entity_type: :node) }, class_name: 'Field::Places1', foreign_key: :entity_id
  has_one :field_places_2, -> { where(entity_type: :node) }, class_name: 'Field::Places2', foreign_key: :entity_id
  has_one :field_places_3, -> { where(entity_type: :node) }, class_name: 'Field::Places3', foreign_key: :entity_id

  has_one :field_spec, -> { where(entity_type: :node) }, class_name: 'Field::Spec', foreign_key: :entity_id
  has_one :field_level, -> { where(entity_type: :node) }, class_name: 'Field::Level', foreign_key: :entity_id
  has_one :field_youtube, -> { where(entity_type: :node) }, class_name: 'Field::Youtube', foreign_key: :entity_id

  has_many :field_ege, -> { where(entity_type: :node) }, class_name: 'Field::Ege', foreign_key: :entity_id

  has_one :field_course_competencies, -> { where(entity_type: :node) },
    class_name: 'Field::CourseCompetencies', foreign_key: :entity_id

  has_one :field_course_disciplines, -> { where(entity_type: :node) },
    class_name: 'Field::CourseDisciplines', foreign_key: :entity_id

  has_one :field_course_features, -> { where(entity_type: :node) },
    class_name: 'Field::CourseFeatures', foreign_key: :entity_id

  has_one :field_course_prospects, -> { where(entity_type: :node) },
    class_name: 'Field::CourseProspects', foreign_key: :entity_id

  has_one :field_course_summary, -> { where(entity_type: :node) },
    class_name: 'Field::CourseSummary', foreign_key: :entity_id

  has_one :field_course_code, -> { where(entity_type: :node) },
    class_name: 'Field::CourseCode', foreign_key: :entity_id

  has_one :node_division, -> { where(entity_type: :node) }, foreign_key: :entity_id
  has_one :division, source: :node, class_name: 'Node::Division', through: :node_division

  def price_1
    field_price_1&.value
  end

  def price_2
    field_price_2&.value
  end

  def price_3
    field_price_3&.value
  end

  def spec
    field_spec&.value
  end

  def level
    field_level&.value
  end

  def time_1
    field_time_1&.value
  end

  def time_2
    field_time_2&.value
  end

  def time_3
    field_time_3&.value
  end

  def places_1
    field_places_1&.value
  end

  def places_2
    field_places_2&.value
  end

  def places_3
    field_places_3&.value
  end

  def youtube
    field_youtube&.value
  end

  def ege
    field_ege.map(&:value)
  end

  def course_competencies
    field_course_competencies&.value
  end

  def course_disciplines
    field_course_disciplines&.value
  end

  def course_features
    field_course_features&.value
  end

  def course_prospects
    field_course_prospects&.value
  end

  def course_summary
    field_course_summary&.value
  end

  def course_code
    field_course_code&.value
  end

  def url
    "/programs/#{nid}"
  end

  class << self
    def with_course_fields
      includes(
        :field_course_competencies, :field_course_disciplines,
        :field_course_features, :field_course_prospects
      )
    end
  end
end

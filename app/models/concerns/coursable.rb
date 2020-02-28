module Coursable
  extend ActiveSupport::Concern

  included do
    has_one :field_course_competencies, -> { where(entity_type: :node) },
      class_name: 'Field::CourseCompetencies', foreign_key: :entity_id

    has_one :field_course_disciplines, -> { where(entity_type: :node) },
      class_name: 'Field::CourseDisciplines', foreign_key: :entity_id

    has_one :field_course_features, -> { where(entity_type: :node) },
      class_name: 'Field::CourseFeatures', foreign_key: :entity_id

    has_one :field_course_prospects, -> { where(entity_type: :node) },
      class_name: 'Field::CourseProspects', foreign_key: :entity_id
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

  class_methods do
    def with_course_fields
      includes(
        :field_course_competencies, :field_course_disciplines,
        :field_course_features, :field_course_prospects
      )
    end
  end
end

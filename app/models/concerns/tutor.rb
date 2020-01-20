module Tutor
  extend ActiveSupport::Concern

  included do
    has_one :field_tutor_edu, -> { where(entity_type: :node) }, class_name: 'Field::TutorEdu', foreign_key: :entity_id
    has_one :field_tutor_qual, -> { where(entity_type: :node) }, class_name: 'Field::TutorQual', foreign_key: :entity_id
    has_many :field_tutor_works, -> { where(entity_type: :node) }, class_name: 'Field::TutorWorks', foreign_key: :entity_id
  end

  def tutor_edu
    field_tutor_edu&.value
  end

  def tutor_qual
    field_tutor_qual&.value
  end

  def tutor_works
    field_tutor_works.map(&:value)
  end

  class_methods do
    def with_tutor_fields
      includes(
        :field_tutor_edu, :field_tutor_qual,
        :field_tutor_works
      )
    end
  end
end

class Admission < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary }

  enum state: { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, done: 99 }

  belongs_to :user, default: -> { Current.user }

  store :identity, accessors: %i[
    first_name last_name middle_name sex birth_date birth_place
  ], coder: JSON, prefix: true

  store :document, accessors: %i[
    nationality type series number issued_by issue_date
  ], coder: JSON, prefix: true

  store :parents, accessors: %i[
    relation_degree name phone
  ], coder: JSON, prefix: true

  store :address, accessors: %i[
    country region district city locality
    index street house building apartment email mobile phone
  ], coder: JSON, prefix: true

  store :school, accessors: %i[
    type name graduation address
    education document_type document_number document_id document_date diploma_type
    merit language
  ], coder: JSON, prefix: true

  store :score, accessors: %i[
    subject ege grade year achievements
  ], coder: JSON, prefix: true

  store :course, accessors: %i[
    form basis program contract status olympiad
  ], coder: JSON, prefix: true

  validates :state, presence: true

  validates :identity_first_name, :identity_last_name, :identity_middle_name,
    :identity_sex, :identity_birth_date, :identity_birth_place,
    presence: true, if: -> { step_after?(1) }

  validates :document_nationality, :document_type, :document_series, :document_number,
    :document_issued_by, :document_issue_date,
    presence: true, if: -> { step_after?(2) }

  validates :parents_relation_degree, :parents_name, :parents_phone,
    presence: true, if: -> { step_after?(3) }

  validates :address_country, :address_region, :address_district, :address_city,
    presence: true, if: -> { step_after?(4) }

  validates :address_index, :address_street, :address_house, :address_mobile,
    presence: true, if: -> { step_after?(5) }

  validates :school_type, :school_name, :school_graduation, :school_address,
    presence: true, if: -> { step_after?(6) }

  validates :school_type, :school_education, :school_document_type,
    :school_document_number, :school_document_id, :school_document_date,
    presence: true, if: -> { step_after?(7) }

  validates :score_subject, :score_ege, :score_grade, :score_year,
    presence: true, if: -> { step_after?(9) }

  validates :course_form, :course_basis, :course_program,
    :course_contract,
    presence: true, if: -> { step_after?(10) }

  after_initialize do
    self.state ||= :one
  end

  def step_after?(step)
    Admission.states[state] > step
  end

  def self.to_csv
    attributes = %i[id] + allowed_params + %i[created_at]

    options = %i[identity_sex document_type school_type school_education school_document_type
      school_diploma_type school_merit school_language course_form course_basis course_status
      course_olympiad]

    CSV.generate(headers: true) do |csv|
      csv << attributes

      all.each do |admission|
        csv << attributes.map{ |attr| options.include?(attr.to_sym) ? (admission.send(attr.to_sym).present? ? I18n.t("admissions.options.#{attr.to_sym}.#{admission.send(attr.to_sym)}") : '') : admission.send(attr) }
      end
    end
  end

  class << self
    def allowed_params
      Admission.stored_attributes[:identity].map { |key| "identity_#{key}" } +
        Admission.stored_attributes[:document].map { |key| "document_#{key}" } +
        Admission.stored_attributes[:parents].map { |key| "parents_#{key}" } +
        Admission.stored_attributes[:address].map { |key| "address_#{key}" } +
        Admission.stored_attributes[:school].map { |key| "school_#{key}" } +
        Admission.stored_attributes[:score].map { |key| "score_#{key}" } +
        Admission.stored_attributes[:course].map { |key| "course_#{key}" } +
        %i[state]
    end
  end
end

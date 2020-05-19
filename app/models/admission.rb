class Admission < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary }

  enum state: { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, done: 99 }

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

  validates :state, presence: true

  validates :identity_first_name, :identity_last_name, :identity_middle_name,
    :identity_sex, :identity_birth_date, :identity_birth_place, presence: true, unless: :one?

  validates :document_nationality, :document_type, :document_series, :document_number,
    :document_issued_by, :document_issue_date, presence: true, unless: :two?

  validates :parents_relation_degree, :parents_name, :parents_phone, presence: true, unless: :three?

  validates :address_country, :address_region, :address_district, :address_city,
    presence: true, unless: :four?

  validates :address_index, :address_street, :address_house, :address_mobile,
    presence: true, unless: :five?

  validates :school_type, :school_name, :school_graduation, :school_address,
    presence: true, unless: :six?

  validates :school_type, :school_education, :school_document_type,
    :school_document_number, :school_document_id, :school_document_date,
    presence: true, unless: :seven?

  validates :score_subject, :score_ege, :score_grade, :score_year,
    presence: true, unless: :nine?

  after_initialize do
    self.state ||= :one
  end

  class << self
    def allowed_params
      Admission.stored_attributes[:identity].map { |key| "identity_#{key}" } +
        Admission.stored_attributes[:document].map { |key| "document_#{key}" } +
        Admission.stored_attributes[:parents].map { |key| "parents_#{key}" } +
        Admission.stored_attributes[:address].map { |key| "address_#{key}" } +
        Admission.stored_attributes[:school].map { |key| "school_#{key}" } +
        Admission.stored_attributes[:score].map { |key| "score_#{key}" } +
        %i[state]
    end
  end
end

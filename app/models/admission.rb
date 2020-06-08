class Admission < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary }

  enum state: { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, ten: 10, done: 99 }

  enum status: { filling: 1, processing: 2, accepted: 4 } do
    event :confirm do
      transition filling: :processing
    end

    event :accept do
      transition processing: :accepted
    end
  end

  belongs_to :user, default: -> { Current.user }

  has_many :subjects, class_name: 'AdmissionAdmissionSubject', dependent: :delete_all
  accepts_nested_attributes_for :subjects

  has_many :directions, class_name: 'AdmissionAdmissionDirection', dependent: :delete_all
  accepts_nested_attributes_for :directions

  has_many :documents, class_name: 'AdmissionDocument', as: :assignable, dependent: :delete_all
  accepts_nested_attributes_for :documents

  store :agreements, accessors: %i[
    schools rules dates credibility original privacy
    ma sp exams target medical
  ], coder: JSON, prefix: true

  store :identity, accessors: %i[
    first_name last_name middle_name sex birth_date birth_place
  ], coder: JSON, prefix: true

  store :document, accessors: %i[
    nationality type series number issued_by issue_date
  ], coder: JSON, prefix: true

  store :parents, accessors: %i[
    relation_degree_first name_first phone_first
    relation_degree_second name_second phone_second
  ], coder: JSON, prefix: true

  store :address, accessors: %i[
    country region district city locality
    index street house building apartment
  ], coder: JSON, prefix: true

  store :residence, accessors: %i[
    country region district city locality
    index street house building apartment mobile phone
  ], coder: JSON, prefix: true

  store :school, accessors: %i[
    type name graduation address
    education document_type document_number document_date diploma_type
    merit language
  ], coder: JSON, prefix: true

  store :score, accessors: %i[
    year achievements
  ], coder: JSON, prefix: true

  store :course, accessors: %i[
    contract status olympiad military study
  ], coder: JSON, prefix: true

  validates :state, presence: true

  validate :document_presence

  validates :agreements_schools, :agreements_rules, :agreements_dates,
    :agreements_credibility, :agreements_original, :agreements_privacy,
    acceptance: true, inclusion: [true, false], if: -> { step_after?(1) }

  validates :identity_first_name, :identity_last_name, :identity_middle_name,
    :identity_sex, :identity_birth_date, :identity_birth_place, :residence_mobile,
    presence: true, if: -> { step_after?(1) }

  validates :document_nationality, :document_type, :document_series, :document_number,
    :document_issued_by, :document_issue_date,
    presence: true, if: -> { step_after?(2) }

  validates :parents_relation_degree_first, :parents_name_first, :parents_phone_first,
    presence: true, if: -> { step_after?(3) }

  validates :address_country, :address_region,
    :address_index, :address_street, :address_house,
    presence: true, if: -> { step_after?(4) }

  validates :residence_country, :residence_region,
    :residence_index, :residence_street, :residence_house,
    presence: true, if: -> { step_after?(5) }

  validates :school_type, :school_name, :school_graduation, :school_address,
    presence: true, if: -> { step_after?(6) }

  validates :school_type, :school_education, :school_document_type,
    :school_document_number, :school_document_date,
    presence: true, if: -> { step_after?(7) }

  validates :school_language,
    presence: true, if: -> { step_after?(8) }

  validates :subjects, :score_year,
    presence: true, if: -> { step_after?(9) }

  validates :directions,
    presence: true, if: -> { step_after?(10) }

  after_initialize do
    self.state ||= :one
    self.status ||= :processing
  end

  def step_after?(step)
    Admission.states[state] > step
  end

  def number
    id
  end

  # Убрать отсюда если есть class << self
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
      Admission.stored_attributes[:agreements].map { |key| "agreements_#{key}" } +
        Admission.stored_attributes[:identity].map { |key| "identity_#{key}" } +
        Admission.stored_attributes[:document].map { |key| "document_#{key}" } +
        Admission.stored_attributes[:parents].map { |key| "parents_#{key}" } +
        Admission.stored_attributes[:address].map { |key| "address_#{key}" } +
        Admission.stored_attributes[:residence].map { |key| "residence_#{key}" } +
        Admission.stored_attributes[:school].map { |key| "school_#{key}" } +
        Admission.stored_attributes[:score].map { |key| "score_#{key}" } +
        [score_achievements: []] +
        Admission.stored_attributes[:course].map { |key| "course_#{key}" } +
        %i[state] + [subject_ids: []] + [subjects_attributes: %i[id admission_subject_id ege grade]] +
        [document_ids: []] + [documents_attributes: %i[id title uuid section]] +
        [direction_ids: []] + [directions_attributes: %i[id admission_direction_id form basis]]
    end
  end

  private

  def document_presence
    if state == 'three'
      errors.add(:documents, :empty) if documents.none? { |d| d.section == 'document' }
    end

    if state == 'eight'
      errors.add(:documents, :empty) if documents.none? { |d| d.section == 'school' }
    end
  end
end

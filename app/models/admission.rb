class Admission < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary }

  enum state: { one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8, nine: 9, done: 99 }

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
    year achievements skip
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

  validates :school_education, :school_document_type,
    :school_document_number, :school_document_date,
    :school_language,
    presence: true, if: -> { step_after?(7) }

  validates :subjects,
    presence: true, if: -> { step_after?(9) && score_skip != true }

  validates :directions,
    presence: true, if: -> { step_after?(10) }

  after_initialize do
    self.state ||= :one
    self.status ||= :processing
  end

  delegate :email, to: :user

  def step_after?(step)
    Admission.states[state] > step
  end

  def step_current
    Admission.states.keys.index(state)
  end

  def step_next
    Admission.states.keys[Admission.states.keys.index(state) + 1]
  end

  def step_prev
    Admission.states.keys[step_current - 1] if step_current > 0
  end

  def number
    id
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
        %i[state] + [subject_ids: []] + [subjects_attributes: %i[id subject ege grade year]] +
        [document_ids: []] + [documents_attributes: %i[id title uuid section]] +
        [direction_ids: []] + [directions_attributes: %i[id course_id form basis]]
    end

    def to_csv
      achievements = AdmissionAchievement.all.map{|a| [a.id, a.title]}.to_h
      courses = Node::Course.where(type: :course).map{|c| [c.nid, c.label]}.to_h

      attributes = %i[id created_at email] + Admission.stored_attributes.map { |k, v| v.map { |a| "#{k}_#{a}".to_sym } }.flatten +
      (0..5).to_a.map{|subj| ["subject_subject_#{subj}".to_sym, "subject_year_#{subj}".to_sym, "subject_ege_#{subj}".to_sym, "subject_grade_#{subj}".to_sym] }.flatten +
      (0..5).to_a.map{|achievement| ["achievement_achievement_#{achievement}".to_sym] }.flatten +
      (0..2).to_a.map{|dir| ["direction_course_#{dir}".to_sym, "direction_form_#{dir}".to_sym, "direction_basis_#{dir}".to_sym] }.flatten

      options = %i[
        identity_sex
        document_type
        parents_relation_degree_first parents_relation_degree_second
        school_type school_education school_document_type
        school_diploma_type school_merit school_language
        course_status course_olympiad
      ]

      CSV.generate(headers: true, force_quotes: true) do |csv|
        csv << attributes

        all.find_each do |admission|
          subjects = admission.subjects
          directions = admission.directions


          csv << attributes.map do |attr|
            next if attr == :score_achievements

            if attr.to_s.include?('subject')
              split = attr.to_s.split('_')
              if subjects[split[2].to_i].present?
                if split[1] == 'subject'
                  value = I18n.t("admissions.options.subjects.#{subjects[split[2].to_i][split[1]]}")
                else
                  value = subjects[split[2].to_i][split[1]]
                end
              else
                next
              end

            elsif attr.to_s.include?('achievement')
              split = attr.to_s.split('_')
              if admission.score_achievements[split[2].to_i].present?
                value = achievements[admission.score_achievements[split[2].to_i]]
              else
                next
              end

            elsif attr.to_s.include?('direction')
              split = attr.to_s.split('_')
              if directions[split[2].to_i].present?
                if split[1] == 'course'
                  value = courses[directions[split[2].to_i]['course_id']]
                else
                  value = I18n.t("admissions.options.course_#{split[1]}.#{directions[split[2].to_i][split[1]]}")
                end
              else
                next
              end

            else
              value = admission.send(attr)

              if options.include?(attr)
                value = value.present? ? I18n.t("admissions.options.#{attr}.#{value}") : ''
              end

              value = value ? 'Да' : 'Нет' if [true, false].include? value
            end

            value
          end
        end
      end
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

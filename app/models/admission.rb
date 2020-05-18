class Admission < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary }

  enum state: { one: 1, two: 2, three: 3, done: 99 }

  belongs_to :user, default: -> { Current.user }

  store :identity, accessors: %i[
    first_name last_name middle_name sex birth_date birth_place
  ], coder: JSON, prefix: true

  validates :state, presence: true

  validates :identity_first_name, :identity_last_name, :identity_middle_name, :identity_sex, :identity_birth_date, :identity_birth_place, presence: true, unless: :one?
  # validates :nationality, :series, :number, presence: true, if: -> { three? || done? }
  # validates :relation_degree, :parents, :parents_phone, presence: true, if: -> { done? }

  after_initialize do
    self.state ||= :one
  end

  class << self
    def allowed_params
      Admission.stored_attributes[:identity].map { |key| "identity_#{key}" } +
        %i[state]
    end
  end
end

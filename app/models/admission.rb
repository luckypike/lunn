class Admission < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary }

  validates :first_name, :last_name, :middle_name, presence: true, if: -> { two? || done? }
  validates :nationality, :series, :number, presence: true, if: -> { three? || done? }
  validates :relation_degree, :parents, :parents_phone, presence: true, if: -> { done? }

  enum state: { one: 1, two: 2, three: 3, done: 99 }

  belongs_to :user
end

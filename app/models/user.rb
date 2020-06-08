class User < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary }

  has_many :admissions, dependent: :nullify

  devise :database_authenticatable, :registerable, :confirmable,
    :recoverable, :rememberable, :validatable

  def remember_me
    true
  end
end

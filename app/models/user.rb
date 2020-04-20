class User < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary }

  has_one :admission, dependent: :nullify

  devise :database_authenticatable, :registerable, :confirmable,
    :recoverable, :rememberable, :validatable
end

class User < ApplicationRecordPrimary
  has_many :admissions, dependent: :nullify
  has_many :user_roles, dependent: :destroy

  devise :database_authenticatable, :registerable, :confirmable,
    :recoverable, :rememberable, :validatable

  def remember_me
    true
  end

  def role?(role)
    user_roles.map(&:role).map(&:to_sym).include?(role)
  end
end

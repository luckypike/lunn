class User < ApplicationRecord
  self.table_name = :_users
  has_one :admission

  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :validatable

  # private
  #
  # def confirmation_required?
  #   false
  # end
end

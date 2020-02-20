class User < ApplicationRecord
  self.table_name = :_users

  devise :database_authenticatable, :registerable, :confirmable,
         :recoverable, :rememberable, :validatable

  # private
  #
  # def confirmation_required?
  #   false
  # end
end

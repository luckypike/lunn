class UserPolicy < ApplicationPolicy
  def account?
    user
  end
end

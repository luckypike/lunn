class DocumentPolicy < ApplicationPolicy
  def create?
    # user
    true
  end

  def destroy?
    # user
    true
  end
end

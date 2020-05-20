class AdmissionPolicy < ApplicationPolicy
  def new?
    true
  end

  def create?
    user&.confirmed?
  end

  def show?
    edit?
  end

  def edit?
    update?
  end

  def update?
    user && record.user == user
  end

  def export?
    true
  end
end

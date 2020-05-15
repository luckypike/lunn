class AdmissionPolicy < ApplicationPolicy
  def new?
    true
  end

  def create?
    user
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
end

class AdmissionPolicy < ApplicationPolicy
  def new?
    create?
  end

  def create?
    true
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

  def page?
    new?
  end

  def continue?
    user
  end
end

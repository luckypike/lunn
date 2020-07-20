class TutorPolicy < ApplicationPolicy
  def new?
    create?
  end

  def create?
    user&.role?(:tutor)
  end

  def index?
    true
  end

  def show?
    true
  end

  def edit?
    update?
  end

  def update?
    user&.role?(:tutor) && user == record.user
  end
end

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
end

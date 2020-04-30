class InvoicePolicy < ApplicationPolicy
  def show?
    true
  end

  def pay?
    show?
  end

  def search?
    true
  end

  def index?
    # temporary
    true
  end

  def create?
    true
  end

  def approve?
    true
  end
end

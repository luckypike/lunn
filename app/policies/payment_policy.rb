class PaymentPolicy < ApplicationPolicy
  def index?
    user&.role?(:accountant)
  end

  def success?
    true
  end

  def payed?
    true
  end

  def fail?
    true
  end
end

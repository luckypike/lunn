class PaymentPolicy < ApplicationPolicy
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

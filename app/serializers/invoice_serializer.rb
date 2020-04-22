class InvoiceSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :uuid, :number, :contract, :state, :amount,
    :first_name, :last_name, :middle_name,
    :payment_amount, :payed_at
end

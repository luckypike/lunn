json.invoices @invoices do |invoice|
  json.extract! invoice, :id, :state, :uuid, :payment_amount, :paid_on, :payment_id
end

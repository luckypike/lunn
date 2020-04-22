json.invoices @invoices do |invoice|
  json.extract! invoice, :id, :state, :payed_at, :uuid, :payment_amount, :payed_at, :payment_id
end

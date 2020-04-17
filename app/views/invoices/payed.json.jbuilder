json.invoices @invoices do |invoice|
  json.extract! invoice, :id, :number, :contract, :state, :payed_at
end

json.invoices @invoices do |invoice|
  json.extract! invoice, :id, :uuid, :number, :desc, :name, :amount
end

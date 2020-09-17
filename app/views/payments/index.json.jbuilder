json.payments @payments do |payment|
  json.partial! payment
  json.extract! payment, :commission
  json.created_at l(payment.created_at.to_date, format: :payment)
end

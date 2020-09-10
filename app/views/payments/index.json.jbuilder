json.payments @payments do |payment|
  json.partial! payment
  json.extract! payment, :commission
end

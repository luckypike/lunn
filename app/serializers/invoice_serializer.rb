class InvoiceSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :number, :contract, :state,
    :first_name, :last_name, :middle_name
end

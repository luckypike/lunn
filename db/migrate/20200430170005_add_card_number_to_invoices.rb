class AddCardNumberToInvoices < ActiveRecord::Migration[6.0]
  def change
    add_column :invoices, :payment_card, :string
  end
end

class AddDescToInvoices < ActiveRecord::Migration[6.0]
  def change
    add_column :invoices, :desc, :text
    add_column :invoices, :paid_on, :timestamp
  end
end

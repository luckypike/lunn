class AddDescToInvoices < ActiveRecord::Migration[6.0]
  def change
    add_column :invoices, :desc, :text
    rename_column :invoices, :payed_at, :paid_on
  end
end

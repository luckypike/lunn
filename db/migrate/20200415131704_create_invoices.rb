class CreateInvoices < ActiveRecord::Migration[6.0]
  def change
    create_table :invoices do |t|
      t.string :last_name
      t.string :first_name
      t.string :middle_name
      t.string :contract
      t.string :payment_id
      t.numeric :payment_amount
      t.timestamp :payed_at
      t.integer :state

      t.timestamps
    end
  end
end

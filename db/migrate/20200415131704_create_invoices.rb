class CreateInvoices < ActiveRecord::Migration[6.0]
  def change
    create_table :invoices do |t|
      t.string :last_name
      t.string :first_name
      t.string :middle_name
      t.string :amount
      t.string :number
      t.string :contract
      t.string :payment_id
      t.numeric :payment_amount
      t.timestamp :payed_at
      t.timestamp :approved_at
      t.integer :state, default: 1

      t.timestamps
    end

    add_index :invoices, %i[number contract], unique: true
    add_index :invoices, %i[last_name contract]
    add_index :invoices, :number
  end
end

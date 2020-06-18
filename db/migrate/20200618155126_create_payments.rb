class CreatePayments < ActiveRecord::Migration[6.0]
  def change
    create_table :payments do |t|
      t.decimal :amount
      t.text :desc
      t.string :phone
      t.string :name
      t.string :number
      t.string :email
      t.string :fop
      t.string :card_number
      t.integer :pid

      t.timestamps
    end
  end
end

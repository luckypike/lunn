class DeviseCreateUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :_users do |t|
      t.string :email, null: false, default: '', index: { unique: true }
      t.string :encrypted_password, null: false, default: ''

      t.string :reset_password_token, index: { unique: true }
      t.datetime :reset_password_sent_at

      t.datetime :remember_created_at

      t.string :confirmation_token, index: { unique: true }
      t.datetime :confirmed_at
      t.datetime :confirmation_sent_at
      # t.string :unconfirmed_email

      t.timestamps null: false
    end
  end
end

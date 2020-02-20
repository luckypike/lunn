class CreateAdmissions < ActiveRecord::Migration[6.0]
  def change
    create_table :admissions do |t|
      t.references :user, null: false, foreign_key: { to_table: :_users }
      t.string :first_name
      t.string :middle_name
      t.string :last_name
      t.integer :state

      t.timestamps
    end
  end
end

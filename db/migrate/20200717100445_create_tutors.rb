class CreateTutors < ActiveRecord::Migration[6.0]
  def change
    create_table :tutors do |t|
      t.string :first_name
      t.string :middle_name
      t.string :last_name
      t.string :position
      t.string :adegree
      t.string :atitle
      t.string :email
      t.string :phone
      t.string :edu
      t.string :school
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end

class CreateAdmissionSubjects < ActiveRecord::Migration[6.0]
  def change
    create_table :admission_subjects do |t|
      t.references :admission, foreign_key: true
      t.references :subject, foreign_key: true

      t.string :ege
      t.string :grade

      t.timestamps
    end
  end
end

class CreateAdmissionSubjects < ActiveRecord::Migration[6.0]
  def change
    create_table :admission_subjects do |t|
      t.string :title
      t.string :desc

      t.timestamps
    end
  end
end

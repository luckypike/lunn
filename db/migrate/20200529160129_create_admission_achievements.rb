class CreateAdmissionAchievements < ActiveRecord::Migration[6.0]
  def change
    create_table :admission_achievements do |t|
      t.string :title
      t.references :admission_subject, foreign_key: true

      t.timestamps
    end
  end
end

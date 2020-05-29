class CreateAchievements < ActiveRecord::Migration[6.0]
  def change
    create_table :achievements do |t|
      t.string :title
      t.references :subject, foreign_key: true

      t.timestamps
    end
  end
end

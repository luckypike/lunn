class CreateAdmissionAdmissionDirections < ActiveRecord::Migration[6.0]
  def change
    create_table :admission_admission_directions do |t|
      t.references :admission, foreign_key: true
      t.references :admission_direction, foreign_key: true

      t.integer :form
      t.integer :basis

      t.timestamps
    end
  end
end

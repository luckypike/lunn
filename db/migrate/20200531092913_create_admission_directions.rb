class CreateAdmissionDirections < ActiveRecord::Migration[6.0]
  def change
    create_table :admission_directions do |t|
      t.string :title
      t.string :desc

      t.timestamps
    end
  end
end

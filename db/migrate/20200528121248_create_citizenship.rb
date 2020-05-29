class CreateCitizenship < ActiveRecord::Migration[6.0]
  def change
    create_table :citizenships do |t|
      t.string :title
      t.string :desc
    end
  end
end

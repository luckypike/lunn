class CreateDocuments < ActiveRecord::Migration[6.0]
  def change
    create_table :documents do |t|
      t.string :title
      t.string :section
      t.string :file
      t.string :uuid
      t.string :size
      t.references :assignable, polymorphic: true

      t.timestamps
    end
  end
end

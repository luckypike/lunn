class AddFiledsToAdmission < ActiveRecord::Migration[6.0]
  def change
    add_column :admissions, :sex, :integer
    add_column :admissions, :birth_date, :timestamp
    add_column :admissions, :birth_place, :text

    add_column :admissions, :nationality, :string
    add_column :admissions, :document, :integer
    add_column :admissions, :series, :string
    add_column :admissions, :number, :string
    add_column :admissions, :issued_by, :text

    add_column :admissions, :relation_degree, :string
    add_column :admissions, :parents, :text
    add_column :admissions, :parents_phone, :string
  end
end

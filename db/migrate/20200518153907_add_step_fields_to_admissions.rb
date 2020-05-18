class AddStepFieldsToAdmissions < ActiveRecord::Migration[6.0]
  def up
    remove_column :admissions, :sex
    remove_column :admissions, :birth_date
    remove_column :admissions, :birth_place

    remove_column :admissions, :nationality
    remove_column :admissions, :document
    remove_column :admissions, :series
    remove_column :admissions, :number
    remove_column :admissions, :issued_by

    remove_column :admissions, :relation_degree
    remove_column :admissions, :parents
    remove_column :admissions, :parents_phone

    add_column :admissions, :document, :json
    add_column :admissions, :parents, :json
    add_column :admissions, :address, :json
    add_column :admissions, :score, :json
    add_column :admissions, :course, :json
  end

  def down
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

    remove_column :admissions, :document
    remove_column :admissions, :parents
    remove_column :admissions, :address
    remove_column :admissions, :score
    remove_column :admissions, :course
  end
end

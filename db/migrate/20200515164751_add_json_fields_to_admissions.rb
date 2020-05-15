class AddJsonFieldsToAdmissions < ActiveRecord::Migration[6.0]
  def change
    add_column :admissions, :identity, :json
    add_column :admissions, :school, :json
  end
end

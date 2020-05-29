class AddResidenceToAdmission < ActiveRecord::Migration[6.0]
  def change
    add_column :admissions, :residence, :json
  end
end

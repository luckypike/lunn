class AddStatusToAdmission < ActiveRecord::Migration[6.0]
  def change
    add_column :admissions, :status, :integer
  end
end

class AddAgreementsToAdmissions < ActiveRecord::Migration[6.0]
  def change
    add_column :admissions, :agreements, :json
  end
end

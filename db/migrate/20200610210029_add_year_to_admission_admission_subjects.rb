class AddYearToAdmissionAdmissionSubjects < ActiveRecord::Migration[6.0]
  def change
    add_column :admission_admission_subjects, :year, :integer
  end
end

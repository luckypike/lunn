class AddCourseToAdmissionAdmissionDirection < ActiveRecord::Migration[6.0]
  def change
    add_column :admission_admission_directions, :course_id, :bigint
  end
end

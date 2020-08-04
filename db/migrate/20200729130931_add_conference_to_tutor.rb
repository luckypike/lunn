class AddConferenceToTutor < ActiveRecord::Migration[6.0]
  def change
    add_column :tutors, :conference, :jsonb
  end
end

class AddFiledsToTutor < ActiveRecord::Migration[6.0]
  def change
    add_column :tutors, :quali, :string
    add_column :tutors, :edu_direction, :string
    add_column :tutors, :exp, :string
    add_column :tutors, :edu_exp, :string
    add_column :tutors, :publication, :jsonb
    add_column :tutors, :discipline, :jsonb
    add_column :tutors, :training, :jsonb
    add_column :tutors, :achievements, :jsonb
    add_column :tutors, :consultation, :text
    add_column :tutors, :courses, :jsonb, default: []
    add_column :tutors, :pps, :jsonb, default: []
  end
end

class DepartmentSerializer
  include FastJsonapi::ObjectSerializer

  attributes :nid, :title

  has_many :tutors

  attribute :has_tutors do |department|
    department.tutors.size.positive?
  end

  # has_many :tutors, if: proc { |_record, params| params[:with_tutors] }
  # has_one :division, if: proc { |_record, params| params[:with_division] }
end

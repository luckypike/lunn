class DivisionSerializer
  include FastJsonapi::ObjectSerializer

  attributes :nid, :title, :desc

  has_many :departments, if: proc { |_record, params| params[:with_departments] }

  has_many :courses do |object, params|
    if params[:with_courses]
      object.courses.sort_by do |course|
        [
          course.title.to_s.strip,
          course.spec.to_s.strip
        ]
      end
    end
  end

  # has_many :courses, if: proc { |_record, params| params[:with_courses] } do |object|
  #   object.courses.sort_by do |course|
  #     [
  #       course.title.to_s.strip,
  #       course.spec.to_s.strip
  #     ]
  #   end
  # end
end

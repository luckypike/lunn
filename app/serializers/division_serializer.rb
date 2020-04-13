class DivisionSerializer
  include FastJsonapi::ObjectSerializer

  attributes :nid, :title, :desc

  has_many :courses do |object|
    object.courses.sort_by do |course|
      [
        course.title.to_s.strip,
        course.spec.to_s.strip
      ]
    end
  end
end

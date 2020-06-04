class CourseSerializer
  include FastJsonapi::ObjectSerializer

  attributes :nid, :title, :url, :desc, :level, :spec, :youtube, :ege,
    :price_1, :price_2, :price_3, :time_1, :time_2, :time_3,
    :places_1, :places_2, :places_3

  attributes :course_competencies, :course_disciplines, :course_features,
    :course_prospects, :text, :course_summary, :course_code,
    if: proc { |_record, params| params[:full] }

  has_many :tutors, if: proc { |_record, params| params[:with_tutors] }
  has_one :division, if: proc { |_record, params| params[:with_division] }
end

class DivisionSerializer
  include FastJsonapi::ObjectSerializer

  attributes :nid, :title, :desc

  has_many :courses
end

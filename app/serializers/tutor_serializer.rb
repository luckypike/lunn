class TutorSerializer
  include FastJsonapi::ObjectSerializer

  attributes :nid, :title, :url

  has_one :image
end

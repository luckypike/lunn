class NewsSerializer
  include FastJsonapi::ObjectSerializer

  attributes :nid, :title, :created, :path
end

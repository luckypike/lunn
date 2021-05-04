class VideoSerializer
  include FastJsonapi::ObjectSerializer

  attributes :nid, :title, :created, :youtube_id
end

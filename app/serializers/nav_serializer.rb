class NavSerializer
  include FastJsonapi::ObjectSerializer

  cache_options enabled: true, cache_length: 30.minutes

  attributes :path, :title, :url, :depth, :mlid, :plid
end

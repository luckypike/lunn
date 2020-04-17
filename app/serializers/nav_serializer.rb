class NavSerializer
  include FastJsonapi::ObjectSerializer

  cache_options store: Rails.cache, namespace: 'fast-jsonapi', expires_in: 30.minutes

  attributes :path, :title, :url, :depth, :mlid, :plid
end

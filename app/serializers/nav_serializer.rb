class NavSerializer
  include FastJsonapi::ObjectSerializer

  attributes :path, :title, :url, :depth, :mlid, :plid
end

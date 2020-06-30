class NodeSerializer
  include FastJsonapi::ObjectSerializer

  attributes :nid, :title, :text
end

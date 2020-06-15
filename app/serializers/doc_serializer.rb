class DocSerializer
  include FastJsonapi::ObjectSerializer

  attributes :fid, :title, :path, :wrapper, :size, :mime, :delta
  # .as_json(only: [], methods: %i[fid path title wrapper size mime]),
end

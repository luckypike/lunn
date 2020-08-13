class ImageSerializer
  include FastJsonapi::ObjectSerializer

  attributes :path, :encoded_path
end

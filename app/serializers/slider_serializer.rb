class SliderSerializer
  include FastJsonapi::ObjectSerializer

  attributes :nid, :title

  attribute :link do |slider|
    slider.link.value
  end

  attribute :image do |slider|
    {
      fid: slider.image.attachment.fid,
      filemime: slider.image.attachment.filemime,
      path: slider.image.attachment.path
    }
  end
end

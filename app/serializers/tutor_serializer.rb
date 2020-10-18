class TutorSerializer
  include FastJsonapi::ObjectSerializer

  # attributes :nid, :title, :url
  attributes :id, :nid, :title, :path, :tutor_types, :department, :position, :tutor_phone_public, :tutor_email_public

  attribute :image do |tutor|
    if tutor.image
      {
        fid: tutor.image.attachment.fid,
        filemime: tutor.image.attachment.filemime,
        path: tutor.image.attachment.path,
        encoded_path: tutor.image.attachment.encoded_path
      }
    end
  end

  # has_one :field_tutor_department
end

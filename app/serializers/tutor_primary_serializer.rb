class TutorPrimarySerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :first_name, :middle_name, :last_name, :position

  attribute :photo do |tutor|
    if tutor.photo.attached?
      path = "s3://#{Rails.application.credentials.dig(:aws, :bucket)}/#{tutor.photo.key}"

      {
        key: tutor.photo.key,
        path: path,
        encoded_path: Base64.urlsafe_encode64(path).tr('=', '').scan(/.{1,16}/).join('/')
      }
    end
  end
end

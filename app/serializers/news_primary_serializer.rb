class NewsPrimarySerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :title

  attribute :images do |news|
    if news.images.attached?
      path = "s3://#{Rails.application.credentials.dig(:aws, :bucket)}/#{news.images.key}"

      {
        key: news.images.key,
        path: path,
        encoded_path: Base64.urlsafe_encode64(path).tr('=', '').scan(/.{1,16}/).join('/')
      }
    end
  end
end

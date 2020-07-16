module ActiveStorageAttachmentExtension
  extend ActiveSupport::Concern

  included do
    connects_to database: { writing: :primary, reading: :primary }
  end
end

Rails.configuration.to_prepare do
  ActiveStorage::Attachment.include ActiveStorageAttachmentExtension
  ActiveStorage::Blob.include ActiveStorageAttachmentExtension
end

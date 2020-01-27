class Feedback < ApplicationRecord
  self.table_name = 'lunn_send_mail_messages'

  before_validation :set_timestamp_and_status, on: :create

  validates :name, :email, :message, :timestamp, :status, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

  private

  def set_timestamp_and_status
    self.timestamp = Time.now.to_i
    self.status = :pending
  end
end

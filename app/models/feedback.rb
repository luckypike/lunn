class Feedback < ApplicationRecord
  self.table_name = 'lunn_send_mail_messages'

  attr_accessor :department_id, :destination_id

  before_validation :set_timestamp_and_status, on: :create
  before_validation :set_destination_and_address, on: :create

  validates :name, :email, :message, :timestamp, :status, presence: true
  validates :address, :destination, presence: true
  validates :email, format: { with: URI::MailTo::EMAIL_REGEXP }

  private

  def set_destination_and_address
    dest = ActiveRecord::Base.connection.exec_query(
      "SELECT title, email FROM lunn_send_mail_destinations WHERE id = #{destination_id.to_i}"
    ).first

    if dest
      self.address = dest['email']
      self.destination = dest['title']
    end
  end

  def set_timestamp_and_status
    self.timestamp = Time.now.to_i
    self.status = :pending
  end
end

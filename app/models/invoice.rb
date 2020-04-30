class Invoice < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary }

  before_validation :remove_whitespaces

  validates :last_name, :contract, :uuid, :number, :amount, presence: true
  validates :uuid, uniqueness: true

  enum state: { active: 1, paid: 2, approved: 3 } do
    event :pay do
      before do
        self.paid_on = Time.zone.now
      end

      transition active: :paid
    end

    event :approve do
      before do
        self.approved_at = Time.zone.now
      end

      transition paid: :approved
    end
  end

  def remove_whitespaces
    contract&.squish!
    number&.squish!
    first_name&.squish!
    last_name&.squish!
    middle_name&.squish!
  end

  def name
    [last_name, first_name, middle_name].join(' ')
  end
end

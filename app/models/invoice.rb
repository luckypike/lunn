class Invoice < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary }

  before_validation :remove_whitespaces

  validates :last_name, :contract, :number, :amount, presence: true
  validates :number, uniqueness: { scope: :contract }

  enum state: { active: 1, payed: 2, approved: 3 } do
    event :pay do
      before do
        self.payed_at = Time.zone.now
      end

      transition active: :payed
    end

    event :approve do
      before do
        self.approved_at = Time.zone.now
      end

      transition payed: :approved
    end
  end

  def remove_whitespaces
    contract.squish!
    number.squish!
    first_name.squish!
    last_name.squish!
    middle_name.squish!
  end
end

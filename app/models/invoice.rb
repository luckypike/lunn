class Invoice < ApplicationRecord
  before_validation :remove_whitespaces

  validates :last_name, :contract, :number, presence: true
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
  end
end

class Payment < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary }

  def system
    if card_number[0] == '5'
      :mastercard
    elsif card_number[0] == '4'
      :visa
    elsif (2200..2204).include?(card_number[0..3].to_i)
      :mir
    end
  end

  def commission
    if system == :mastercard
      amount * 0.02 + 1
    elsif system == :visa
      amount * 0.012 + 1
    elsif system == :mir
      amount * 0.012 + 1
    end
  end
end

class AdmissionDirection < ApplicationRecord
  connects_to database: { writing: :primary, reading: :primary }

  def label
    "#{title}#{desc.present? ? " - #{desc}" : ""}"
  end
end

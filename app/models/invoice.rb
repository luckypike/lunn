class Invoice < ApplicationRecord
  enum state: { active: 1, payed: 2, approved: 3 } do
    event :pay do

      transition active: :done
    end

    event :approved do

      transition payed: :approved
    end
  end
end

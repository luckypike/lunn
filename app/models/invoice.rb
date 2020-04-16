class Invoice < ApplicationRecord
  enum state: { new: 1, payed: 2, done: 3 }
end

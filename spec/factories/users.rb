FactoryBot.define do
  factory :user do
    factory :random_user do
      email { 'test@test.ru' }
      password { '123' }
    end
  end
end

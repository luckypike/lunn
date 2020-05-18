FactoryBot.define do
  factory :admission do
    trait :step_one do
      state { :one }
    end

    trait :step_two do
      state { :two }
    end

    trait :random_user do
      user factory: :random_user
    end

    # factory :pickup_order do
    #   user factory: :common_user
    #
    #   to_pay { true }
    #   delivery { :pickup }
    # end
  end
end

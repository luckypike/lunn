class UserSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :email

  attribute :confirmed, &:confirmed?

  attribute :is_accountant do |user, params|
    params[:with_roles] && user.role?(:accountant)
  end
end

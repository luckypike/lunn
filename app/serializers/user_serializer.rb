class UserSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :email

  attribute :confirmed, &:confirmed?
end

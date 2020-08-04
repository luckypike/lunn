class UserSerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :email

  attribute :confirmed, &:confirmed?

  attribute :tutor do |user, params|
    params[:with_roles] && user.role?(:tutor)
  end

  attribute :has_page do |user|
    user.role?(:tutor) && user.tutor.present?
  end

  attribute :page do |user|
    user.tutor.id if user.role?(:tutor) && user.tutor.present?
  end

  attribute :editor do |user, params|
    params[:with_roles] && user.role?(:editor)
  end

  attribute :admissioner do |user, params|
    params[:with_roles] && user.role?(:admissioner)
  end
end

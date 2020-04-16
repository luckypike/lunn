class UsersController < ApplicationController
  after_action :verify_authorized

  def account
    @user = current_user
    authorize User
  end
end

class DashboardController < ApplicationController
  after_action :verify_authorized

  def index
    authorize :dashboard
  end
end

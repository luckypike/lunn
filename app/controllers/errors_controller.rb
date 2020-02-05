class ErrorsController < ApplicationController
  def show
    @code = params[:code]
  end
end

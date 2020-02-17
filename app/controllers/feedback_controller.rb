class FeedbackController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index; end

  def create
    @feedback = Feedback.new(feedback_params)

    sleep 2

    if @feedback.save
      head :created
    else
      render json: @feedback.errors, status: :unprocessable_entity
    end
  end

  private

  def feedback_params
    params.require(:feedback).permit(:name, :email, :message, :destination_id, :department_id)
  end
end

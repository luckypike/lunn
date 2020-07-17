class TutorsController < ApplicationController
  before_action :set_url_alias, only: %i[index show]
  before_action :set_node, only: %i[index show]
  before_action :authorize_tutor

  after_action :verify_authorized

  def index
    @tutors = Node::Tutor.lang
      .includes(
        :image, :field_tutor_types, :field_position,
        :field_tutor_email, :field_tutor_phone, :field_department
      )
    # respond_to :html, :json
  end

  def show
    @tutor = Node::Tutor.find(params[:id])

    respond_to :html, :json
  end

  def new
    @tutor = Tutor.new
  end

  def create
    @tutor = Tutor.where(user: current_user).first_or_initialize(tutor_params)

    respond_to do |format|
      format.json do
        if @tutor.save
          render json: { id: @tutor.id }, status: :created
        else
          render json: @tutor.errors, status: :unprocessable_entity
        end
      end
    end
  end

  private

  def authorize_tutor
    authorize @tutor || Tutor
  end

  def tutor_params
    params.require(:tutor).permit(:first_name, :last_name, :middle_name, :position)
  end
end

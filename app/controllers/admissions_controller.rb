class AdmissionsController < ApplicationController
  before_action :set_url_alias, only: :page
  before_action :set_node, only: :page
  before_action :set_admission, only: %i[edit update]
  before_action :authorize_admission

  after_action :verify_authorized

  def page
    # DO NOT REMOVE! @brg
  end

  def index
    respond_to :html, :json
  end

  def sync
    @admissions = Admission.all
  end

  def export
    respond_to do |format|
      format.csv { send_data Admission.done.to_csv, filename: "export.csv" }
    end
  end

  def new
    respond_to do |format|
      format.html { render :index }
    end
  end

  def create
    @admission = Admission.new(admission_params)

    respond_to do |format|
      format.json do
        if @admission.save
          render json: { id: @admission.id }, status: :created
        else
          render json: @admission.errors, status: :unprocessable_entity
        end
      end
    end
  end

  def edit
    respond_to do |format|
      format.html { render :index }
      format.json
    end
  end

  def update
    current_state = @admission.state

    if @admission.update(admission_params)
      head :ok
    else
      render json: @admission.errors, status: :unprocessable_entity
    end
  end

  private

  def set_admission
    @admission = Admission.find(params[:id])
  end

  def authorize_admission
    authorize @admission || Admission
  end

  def admission_params
    params.require(:admission).permit(Admission.allowed_params)
  end
end

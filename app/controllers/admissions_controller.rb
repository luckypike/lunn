class AdmissionsController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :set_admission, only: %i[edit update]

  def index
    respond_to :html, :json
  end

  def sync
    @admissions = Admission.all
  end

  def new
    respond_to do |format|
      format.html { render :index }
      format.json
    end
  end

  def create
    @admission = Admission.new(admission_params)

    if @admission.save
      head :created, location: account_event_path(id: @event.id)
    else
      render json: @admission.errors, status: :unprocessable_entity
    end
  end

  def edit
    respond_to do |format|
      format.html { render :index }
      format.json { render json: { values: @admission } }
    end
  end

  def update
    @admission.state = Admission.states.keys[Admission.states.keys.index(@admission.state) + 1] unless @admission.state == :done

    if @admission.update(admission_params)
      render json: { values: @admission }
    else
      render json: @admission.errors, status: :unprocessable_entity
    end
  end

  private

  def set_admission
    @admission = Admission.find(params[:id])
  end

  def admission_params
    params.require(:admission).permit(
      :first_name, :last_name, :middle_name, :sex, :birth_date, :birth_place,
      :nationality, :document, :series, :number, :issued_by,
      :relation_degree, :parents, :parents_phone
    )
  end
end

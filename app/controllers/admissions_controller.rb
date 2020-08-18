class AdmissionsController < ApplicationController
  before_action :set_url_alias, only: %i[page list]
  before_action :set_node, only: %i[page list]
  before_action :set_admission, only: %i[edit update show confirm accept jump]
  before_action :authorize_admission

  after_action :verify_authorized

  def page
    # DO NOT REMOVE! @brg
  end

  def list
    respond_to do |format|
      format.html
      format.json do
        @order = {
          1 => [1, 2, 3],
          2 => [1, 2, 3],
          3 => [1, 2, 3],
          4 => [1, 2, 3],
          5 => [3, 10, 2],
          6 => [3, 10, 2],
          7 => [3, 10, 2],
          8 => [3, 10, 2],
          9 => [11, 2, 3],
          10 => [11, 2, 3],
          11 => [12, 2, 3],
          12 => [10, 2, 11],
          13 => [10, 2, 11],
          14 => [11, 3, 2],
          15 => [11, 3, 2],
          16 => [11, 3, 2],
          17 => [11, 3, 2],
          18 => [12, 2, 3],
          19 => [12, 2, 3],
          20 => [12, 2, 3],
          21 => [12, 2, 3],
          22 => [3, 2, 12],
          23 => [3, 2, 12],
          24 => [3, 2, 12],
          25 => [3, 2, 12],
          26 => [3, 2, 12],
          27 => [3, 2, 12],
          28 => [3, 2, 12],
          29 => [3, 2, 12],
          30 => [3, 2, 12],
          31 => [3, 2, 12],
          32 => [3, 2, 12],
          33 => [3, 2, 12],
          34 => [3, 2, 12],
        }
        @list = Admission.list
        @exams = Admission.exams
        @profiles = []
        @categories = []
      end
    end
  end

  def index
    respond_to :html, :json
  end

  def sync
    @admissions = Admission.all
  end

  def export
    respond_to do |format|
      format.csv do
        if Rails.application.credentials.dig(:api, :key) == params[:key]
          send_data Admission.done.processing.to_csv, filename: 'export.csv'
        else
          head :unauthorized
        end
      end
    end
  end

  def show
    respond_to do |format|
      format.html { render :index }
      format.json
    end
  end

  def confirm
    @admission.confirm
  end

  def accept
    @admission.accept
  end

  def new
    respond_to do |format|
      format.html { render :index }
      format.json do
        @admissions = Admission.where(user: current_user)
      end
    end
  end

  def create
    @admission = Admission.where(user: current_user).filling.first_or_initialize

    respond_to do |format|
      format.json do
        if @admission.save
          render json: { id: @admission.id }, status: :created
        else
          store_location_for(:user, continue_admissions_path)
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

  def continue
    admission = Admission.where(user: current_user).filling.first_or_create

    redirect_to edit_admission_path(id: admission, locale: nil)
  end

  def update
    if @admission.update(admission_params)
      head :ok
    else
      render json: @admission.errors, status: :unprocessable_entity
    end
  end

  def jump
    @admission.update(admission_params)

    head :ok
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

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
          1 => [1, 2, 99],
          2 => [1, 2, 99],
          3 => [1, 2, 99],
          4 => [1, 2, 99],
          5 => [99, 10, 2],
          6 => [99, 10, 2],
          7 => [99, 10, 2],
          8 => [99, 10, 2],
          9 => [11, 2, 99],
          10 => [11, 2, 99],
          11 => [12, 2, 99],
          12 => [10, 2, 11],
          13 => [10, 2, 11],
          14 => [11, 99, 2],
          15 => [11, 99, 2],
          16 => [11, 99, 2],
          17 => [11, 99, 2],
          18 => [12, 2, 99],
          19 => [12, 2, 99],
          20 => [12, 2, 99],
          21 => [12, 2, 99],
          22 => [99, 2, 12],
          23 => [99, 2, 12],
          24 => [99, 2, 12],
          25 => [99, 2, 12],
          26 => [99, 2, 12],
          27 => [99, 2, 12],
          28 => [99, 2, 12],
          29 => [99, 2, 12],
          30 => [99, 2, 12],
          31 => [99, 2, 12],
          32 => [99, 2, 12],
          33 => [99, 2, 12],
          34 => [99, 2, 12]
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

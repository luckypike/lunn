class AdmissionDocumentsController < ApplicationController
  before_action :set_document, only: %i[destroy]
  before_action :authorize_document

  after_action :verify_authorized

  def create
    authorize AdmissionDocument
    @document = AdmissionDocument.new(document_params)

    if @document.save
      render json: @document
    else
      render json: @document.errors, status: :unprocessable_entity
    end
  end

  def destroy
    authorize AdmissionDocument

    @document.destroy
    head :ok
  end

  private

  def set_document
    @document = AdmissionDocument.find(params[:id])
  end

  def authorize_document
    authorize @document || AdmissionDocument
  end

  def document_params
    params.require(:document)
      .permit(:title, :file, :uuid, :section, :size)
  end
end

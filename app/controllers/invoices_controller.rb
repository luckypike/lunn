class InvoicesController < ApplicationController
  skip_before_action :verify_authenticity_token, only: [:create]

  before_action :set_invoice, only: [:pay]
  before_action :verify_authenticity_token, only: [:create], unless: :secure?

  def index
    @invoices = Invoice.all
  end

  def create
    @invoice = Invoice.new(invoice_params)
    @invoice.state = :active

    if @invoice.save
      head :created, location: invoices_path
    else
      render json: @invoice.errors, status: :unprocessable_entity
    end
  end

  def pay
    @invoice.payed!
    head :ok
  end

  def approve
    @invoice.approve
    head :ok
  end

  def invoice_params
    permitted =
      %i[last_name first_name middle_name contract]

    params.require(:invoice).permit(*permitted)
  end

  def set_invoice
    @invoice = Invoice.find(params[:id])
  end

  protected

  def secure?
    params[:security]
  end
end

class InvoicesController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :verify_api_key, only: %i[create approve payed]

  def index
    @invoices = Invoice.all
  end

  def payed
    @invoices = Invoice.payed
  end

  def create
    @invoice = Invoice.active.where(uuid: invoice_params[:uuid])
      .first_or_initialize

    if @invoice.update(invoice_params)
      head :created, location: invoices_path
    else
      render json: @invoice.errors, status: :unprocessable_entity
    end
  end

  def pay
    @invoice = Invoice.active.find_by!(uuid: params[:orderid])

    if @invoice&.can_pay?
      @invoice.pay
      @invoice.update(payment_id: 999, payment_amount: 999)
      head :ok
    else
      head :unprocessable_entity
    end
  end

  def approve
    @invoice = Invoice.payed.find_by!(uuid: params[:id])

    if @invoice&.can_approve?
      @invoice.approve
      head :ok
    else
      head :unprocessable_entity
    end
  end

  private

  def verify_api_key
    return if Rails.application.credentials.dig(:api, :key) == request.headers['HTTP_X_LUNN_KEY']

    head :unauthorized
  end

  def invoice_params
    permitted = %i[last_name first_name middle_name contract number amount uuid email]

    params.require(:invoice).permit(*permitted)
  end
end

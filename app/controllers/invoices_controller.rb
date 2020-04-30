class InvoicesController < ApplicationController
  skip_before_action :verify_authenticity_token

  before_action :set_invoice, only: :show
  before_action :authorize_invoice
  before_action :verify_api_key, only: %i[create approve paid]

  after_action :verify_authorized


  def index
    @invoices = Invoice.all
  end

  def paid
    @invoices = Invoice.paid
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
    if Digest::MD5.hexdigest(
      params.slice(
        :id, :sum, :clientid, :orderid
      ).values.push(Rails.application.credentials.dig(:payment, :key)).join('')
    ) == params[:key]
      @invoice = Invoice.active.find_by!(number: params[:orderid])

      if @invoice&.can_pay?
        @invoice.pay
        @invoice.update(
          payment_id: params[:id],
          payment_amount: params[:sum],
          payment_card: params[:card_number]
        )

        render inline: ('OK ' + Digest::MD5.hexdigest(params[:id] + Rails.application.credentials.dig(:payment, :key)))
      else
        head :ok
      end
    else
      head :unprocessable_entity
    end
  end

  def approve
    @invoice = Invoice.paid.find_by!(uuid: params[:id])

    if @invoice&.can_approve?
      @invoice.approve
      head :ok
    else
      head :unprocessable_entity
    end
  end

  def search
    authorize Invoice

    sleep 1

    # TODO: перепроверить все условия поиска
    @invoices = Invoice.active
      .where(
        'LOWER(contract) LIKE ?',
        params[:contract]&.downcase&.squish!
      )
      .where(
        'LOWER(last_name) LIKE ?',
        params[:last_name]&.downcase&.squish!
      )

    respond_to :json
  end

  def show

  end

  private

  def set_invoice
    @invoice = Invoice.find_by!(uuid: params[:id])
  end

  def authorize_invoice
    authorize @invoice || Invoice
  end

  def verify_api_key
    return if Rails.application.credentials.dig(:api, :key) == request.headers['HTTP_X_LUNN_KEY']

    head :unauthorized
  end

  def invoice_params
    permitted = %i[
      last_name first_name middle_name email
      contract number amount uuid desc
    ]

    params.require(:invoice).permit(*permitted)
  end
end

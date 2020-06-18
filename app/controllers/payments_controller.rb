class PaymentsController < ApplicationController
  skip_before_action :verify_authenticity_token, only: :payed

  before_action :authorize_payment

  after_action :verify_authorized

  def success; end

  def fail; end

  def payed
    if Digest::MD5.hexdigest(
      params.slice(
        :id, :sum, :clientid, :orderid
      ).values.push(Rails.application.credentials.dig(:payment, :key)).join('')
    ) == params[:key]
      @payment = Payment.where(pid: params[:id]).first_or_initialize
      @payment.phone = params[:client_phone]
      @payment.name = params[:clientid]
      @payment.number = params[:orderid]
      @payment.amount = params[:sum]
      @payment.card_number = params[:card_number]
      @payment.fop = params[:fop_receipt_key]
      @payment.email = params[:client_email]
      @payment.desc = params[:service_name]

      if @payment.save
        render inline: ('OK ' + Digest::MD5.hexdigest(params[:id] + Rails.application.credentials.dig(:payment, :key)))
      else
        head :ok
      end

      # @payment = Invoice.active.find_by!(number: params[:orderid])

      # if @invoice&.can_pay?
      # #   @invoice.pay
      # #   @invoice.update(
      # #     payment_id: params[:id],
      # #     payment_amount: params[:sum],
      # #     payment_card: params[:card_number]
      # #   )
      #
      #   render inline: ('OK ' + Digest::MD5.hexdigest(params[:id] + Rails.application.credentials.dig(:payment, :key)))
      # else
      #   head :ok
      # end
    else
      head :unprocessable_entity
    end
  end

  private

  def authorize_payment
    authorize Payment
  end
end

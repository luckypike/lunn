class InvoicesController < ApplicationController
  def index
    @invoices = Invoice.all
  end

  def create
    @invoice = Invoice.new(invoice_params)
    @invoice.state = :new
    authorize @invoice

    if @invoice.save
      head :created, location: invoices_path
    else
      render json: @invoice.errors, status: :unprocessable_entity
    end
  end

  def invoice_params
    permitted =
      %i[last_name first_name middle_name contract]

    params.require(:invoice).permit(*permitted)
  end
end
end

class AdmissionsController < ApplicationController
  before_action :set_url_alias, only: :page
  before_action :set_node, only: :page

  def page; end

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
end

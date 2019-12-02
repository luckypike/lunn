class NewsController < ApplicationController
  def index
    respond_to :html, :json
  end

  def show
    render :index
  end
end

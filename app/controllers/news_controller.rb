class NewsController < ApplicationController
  def index
    @news = Node.news.lang.includes(:images)
      .order(created: :desc).limit(20)

    respond_to :html, :json
  end

  def show
    respond_to do |format|
      format.html { render :index }
      format.json { }
    end
  end
end

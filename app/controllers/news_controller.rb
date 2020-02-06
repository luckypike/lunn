class NewsController < ApplicationController
  before_action :set_node, only: :show

  def index
    respond_to do |format|
      format.html
      format.json do
        limit = params[:limit].to_i
        limit = 10 if limit > 20

        @total = Node.news.lang.size
        @news = Node.news.lang.includes(:images, :summary)
          .order(created: :desc).limit(limit)
          .offset(limit * (params[:page].to_i - 1))
      end
    end
  end

  def show
    respond_to do |format|
      format.html { render :index }
      format.json
    end
  end

  private

  def set_node
    @node = Node.news.find(params[:id])
  end
end

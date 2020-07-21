class NewsController < ApplicationController
  before_action :set_node, only: :show
  before_action :set_news, only: %i[edit update]

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

  def new
    @news = News.new
  end

  def create
    @news = News.new(news_params)

    sleep 1

    respond_to do |format|
      format.json do
        if @news.save
          render json: @news, status: :created
        else
          render json: @news.errors, status: :unprocessable_entity
        end
      end
    end
  end

  def edit; end

  def update
    respond_to do |format|
      format.json do
        if @news.update(news_params)
          status :created
        else
          render json: @news.errors, status: :unprocessable_entity
        end
      end
    end
  end

  private

  def set_news
    @news = News.find(params[:id])
  end

  def news_params
    params.require(:news).permit(
      :title, :user_id, images: []
    )
  end

  def set_node
    @node = Node.news.find(params[:id])
  end
end

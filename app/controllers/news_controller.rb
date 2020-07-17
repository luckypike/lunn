class NewsController < ApplicationController
  before_action :set_node, only: :show
  before_action :set_news, only: :edit

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
    @news = News.where(user: current_user).first_or_initialize(news_params)

    sleep 1

    if @news.save
      head :created
    else
      render json: @news.errors, status: :unprocessable_entity
    end
  end

  def edit; end

  private

  def set_news
    @news = News.find(params[:id])
  end

  def news_params
    params.require(:news).permit(
      :title, :user_id, images: {}
    )
  end

  def set_node
    @node = Node.news.find(params[:id])
  end
end

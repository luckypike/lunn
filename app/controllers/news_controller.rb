class NewsController < ApplicationController
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
      format.json do
        @url_alias = UrlAlias.find_by(alias: "news/#{params[:id]}")
        if @url_alias.source.start_with?('node/')
          @node = Node.news.includes(:images, :body)
            .find(@url_alias.source.split('/').last)
        end
      end
    end
  end
end

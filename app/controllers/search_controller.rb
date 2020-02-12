class SearchController < ApplicationController
  def index
    respond_to do |format|
      format.html { render :index }
      format.json do
        @nodes = Node.includes(:node).joins(:node)
          .where(node: { language: I18n.locale })
          .search(params[:q]).records
      end
    end
  end
end

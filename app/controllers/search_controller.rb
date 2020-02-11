class SearchController < ApplicationController
  def index
    respond_to do |format|
      format.html { render :index }
      format.json do
        words = params[:q].split(' ').reject(&:blank?)
        @results = SearchApi.where(word: words.map(&:downcase))
          .includes(:node).joins(:node)
          .group(:item_id).having('count(*) >= ?', words.size)
          .order('sum(score) DESC')
          .where(node: { language: I18n.locale })
      end
    end
  end
end

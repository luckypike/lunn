class SearchController < ApplicationController
  def index
    respond_to do |format|
      format.html { render :index }
      format.json do
        @records = Node.includes(:node).joins(:node)
          .where(node: { language: I18n.locale })
          .search(
            query: {
              bool: {
                must: {
                  multi_match: {
                    query: params[:q]
                  }
                }
              }
            },
            highlight: {
              fields: {
                'body.sanitized': {
                  number_of_fragments: 1,
                  pre_tags: ['<strong>'],
                  post_tags: ['</strong>']
                }
              }
            }
          ).records
      end
    end
  end
end

class TutorsController < ApplicationController
  before_action :set_url_alias
  before_action :set_node

  def index
    respond_to do |format|
      format.html
      format.json do
        @tutors = Node.employees.lang
          .includes(:image)
      end
    end
  end

  def show
    @loaf = Node.find(
      UrlAlias.find_by(alias: :tutors).source.split('/').last
    ).loaf

    respond_to :html, :json
  end
end

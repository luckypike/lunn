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
    respond_to do |format|
      format.html
      format.json do
      end
    end
  end
end

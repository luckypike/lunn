class TutorsController < ApplicationController
  before_action :set_url_alias, only: :index
  before_action :set_node, only: :index
  before_action :set_tutor, only: :show

  def index
    @tutors = Node.employees.lang
      .includes(
        :image, :field_tutor_types, :field_position,
        :field_tutor_email, :field_tutor_phone, :field_department
      )

    # respond_to :html, :json
  end

  def show
    @loaf = Node.find(
      UrlAlias.find_by(alias: :tutors).source.split('/').last
    ).loaf

    respond_to :html, :json
  end

  private

  def set_tutor
    @node = Node.find(params[:id])
  end
end

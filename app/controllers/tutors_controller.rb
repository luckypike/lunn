class TutorsController < ApplicationController
  before_action :set_url_alias
  before_action :set_node

  def index
    @tutors = Node::Tutor.lang
      .includes(
        :image, :field_tutor_types, :field_position,
        :field_tutor_email, :field_tutor_phone, :field_department
      )
    # respond_to :html, :json
  end

  def show
    @tutor = Node::Tutor.find(params[:id])

    respond_to :html, :json
  end
end

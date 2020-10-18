class TutorsController < ApplicationController
  before_action :set_url_alias
  before_action :set_node

  def index
    @divisions = Node::Division.lang
      .includes(
        :summary, :image,
        departments: {
          tutors: %i[image field_tutor_types field_position field_tutor_email field_tutor_phone field_department]
        }
      )

    @tutors = Node::Tutor.published.lang
      .includes(
        :image, :field_tutor_types, :field_position,
        :field_tutor_email, :field_tutor_phone, :field_department
      ).order(title: :asc)
  end

  def show
    @tutor = Node::Tutor.published.find(params[:id])

    respond_to :html, :json
  end
end

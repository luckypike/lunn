class CoursesController < ApplicationController
  before_action :set_url_alias
  before_action :set_node

  def index
    @divisions = Node::Division.lang
      .includes(
        :summary, :image,
        courses: %i[
          summary field_spec field_youtube field_ege field_level
          field_course_exams field_course_code
          field_price_1 field_price_2 field_price_3
          field_time_1 field_time_2 field_time_3
          field_places_1 field_places_2 field_places_3
        ]
      )
  end

  def show
    @course = Node::Course.lang
      .includes(
        tutors: :image
      ).find(params[:id])
  end

  def ugsn
    @ugsns = Node.ugsns.lang
      .includes(
        :image, :summary,
        ugsn_courses: %i[
          summary field_spec field_youtube field_ege field_level
          field_price_1 field_price_2 field_price_3
          field_time_1 field_time_2 field_time_3
          field_places_1 field_places_2 field_places_3
        ]
      )
  end
end

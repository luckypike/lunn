class CoursesController < ApplicationController
  before_action :set_url_alias
  before_action :set_node

  def index
    @courses = Node.courses.lang
      .with_prices.with_times.with_places
      .includes(
        :field_spec, :field_youtube, :field_ege, :field_level, :summary
      )

    respond_to :html
  end

  def show
    @loaf = Node.find(
      UrlAlias.find_by(alias: :programs).source.split('/').last
    ).loaf

    @url_alias = UrlAlias.find_by(alias: params[:path])
    if @url_alias.source.start_with?('node/')
      @course = Node.courses.lang
        .with_prices.with_times.with_places
        .includes(:field_spec, :field_youtube, :field_ege, :body)
        .find(@url_alias.source.split('/').last)
    end

    respond_to :html
  end

  def divisions
    @divisions = Node.divisions.lang
      .includes(
        :image, :summary,
        division_courses: %i[
          summary field_spec field_youtube field_ege field_level
          field_price_1 field_price_2 field_price_3
          field_time_1 field_time_2 field_time_3
          field_places_1 field_places_2 field_places_3
        ]
      )
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

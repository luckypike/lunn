class CoursesController < ApplicationController
  before_action :set_url_alias
  before_action :set_node

  def index
    @courses = Node.courses.lang
      .with_prices.with_times.with_places
      .includes(
        :field_spec, :field_youtube, :field_ege
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
end

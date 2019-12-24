class CoursesController < ApplicationController
  before_action :set_url_alias
  before_action :set_node

  def index
    @courses = Node.courses.lang
      .with_prices.with_times
      .includes(
        :field_spec, :field_youtube, :field_ege
      )

    respond_to :html
  end

  def show
    @loaf = Node.find(
      UrlAlias.find_by(alias: :courses).source.split('/').last
    ).loaf
  end
end

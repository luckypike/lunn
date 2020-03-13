class DivisionsController < ApplicationController
  # before_action :set_url_alias
  # before_action :set_node

  def index
    @node = Node.find(4395)

    @divisions = Node.divisions.lang

    @courses = Node.courses.lang
      .with_prices.with_times.with_places
      .includes(
        :field_spec, :field_youtube, :field_ege, :field_level
      )

    respond_to do |format|
      format.html
      format.json
    end
  end
end

class PagesController < ApplicationController
  before_action :set_url_alias, except: :index
  before_action :set_node, except: :index

  def index
    @news = Node.news.lang.includes(:images)
      .order(created: :desc).limit(4)

    @events = Node.events.includes(:date).joins(:date).lang
      .where(
        'field_data_field_date_begin.field_date_begin_value > ?',
        Time.current.beginning_of_day
      )
      .order('field_data_field_date_begin.field_date_begin_value': :asc)
      .limit(6)

    if @events.size < 6
      @events = Node.events.includes(:date).joins(:date).lang
        .order('field_data_field_date_begin.field_date_begin_value': :asc)
        .last(6)
    end

    @sliders = Node.sliders.lang.published
      .includes(:image, :dates)
      .order(created: :desc)

    respond_to :html, :json
  end
end

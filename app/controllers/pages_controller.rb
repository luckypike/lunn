class PagesController < ApplicationController
  before_action :set_url_alias, except: %i[index contacts announces]
  before_action :set_node, except: %i[index contacts announces]

  def index
    @news = Node.news.lang.includes(:summary)
      .order(created: :desc).limit(6)

    @events = Node.events.joins(:date).lang
      .where(
        'field_data_field_date_begin.field_date_begin_value > ?',
        Time.current.beginning_of_day
      )
      .order('field_data_field_date_begin.field_date_begin_value': :asc)
      .limit(3)

    if @events.size < 3
      @events = Node.events.joins(:date).lang
        .order('field_data_field_date_begin.field_date_begin_value': :asc)
        .last(3)
    end

    # TODO: убрать эту загрузку, выяснить почему includes не сработал
    ActiveRecord::Associations::Preloader.new.preload(@events, :date)

    @sliders = Node.sliders.lang.published
      .includes(:image, :dates, :link)
      .order(created: :desc)
      .limit(5)

    @video = Node.video.active.lang.includes(:field_youtube).order(created: :desc).limit(2)
    # respond_to :html, :json
  end

  def contacts; end

  def announces
    respond_to :xml
  end
end

class EventsController < ApplicationController
  before_action :set_node, only: :show

  def index
    respond_to do |format|
      format.html
      format.json do
        @events = Node.events.joins(:date).lang
        .where(
          'field_data_field_date_begin.field_date_begin_value > ?',
          Time.current.beginning_of_day
        )
        .order('field_data_field_date_begin.field_date_begin_value': :asc)

        if @events.size < 3
          @events = Node.events.joins(:date).lang
            .order('field_data_field_date_begin.field_date_begin_value': :desc)
            .first(3)
        end

        ActiveRecord::Associations::Preloader.new.preload(@events, :date)
      end
    end
  end

  def show
    respond_to do |format|
      format.html { render :index }
      format.json
    end
  end

  private

  def set_node
    @node = Node.events.find(params[:id])
  end
end

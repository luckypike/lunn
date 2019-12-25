class EventsController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json do
        @events = Node.events.joins(:date).lang
          .order('field_data_field_date_begin.field_date_begin_value': :asc)
      end
    end
  end

  def show
    respond_to do |format|
      format.html { render :index }
      format.json do
        @url_alias = UrlAlias.find_by(alias: "events/#{params[:id]}")
        if @url_alias.source.start_with?('node/')
          @event = Node.events.includes(:images, :body)
            .find(@url_alias.source.split('/').last)
        end
      end
    end
  end
end

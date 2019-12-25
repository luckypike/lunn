class EventsController < ApplicationController
  def index
    respond_to do |format|
      format.html
      format.json do
        @events = Node.events.joins(:date).lang

        ActiveRecord::Associations::Preloader.new.preload(@events, :date)
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

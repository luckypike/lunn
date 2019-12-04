class PagesController < ApplicationController
  before_action :set_url_alias, except: :index
  before_action :set_node, except: :index
  before_action :set_nav, except: :index

  def index
    @news = Node.news.lang.includes(:images)
      .order(created: :desc).limit(4)

    @events = Node.events.lang
      .where('created > ?', Time.current.beginning_of_day)
      .order(created: :asc).limit(5)

    respond_to :html, :json
  end

  private

  def set_url_alias
    @url_alias = UrlAlias.find_by(alias: params[:path])
  end

  def set_node
    @node = Node.find(@url_alias.source.split('/').last) if @url_alias.source.start_with?('node/')
  end

  def set_nav
    mlid = Nav.main_or_sec.find_by(link_path: @url_alias.source).mlid
    @nav = Nav.lang.where(plid: mlid)
    pp @nav
  end
end

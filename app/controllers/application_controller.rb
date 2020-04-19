class ApplicationController < ActionController::Base
  # protect_from_forgery with: :exception

  around_action :switch_locale

  before_action :set_current_user
  before_action :set_url_aliases
  before_action :set_global_navs

  private

  def switch_locale(&action)
    locale = params[:locale] || I18n.default_locale
    I18n.with_locale(locale, &action)
  end

  def set_current_user
    Current.user = current_user
  end

  def set_url_aliases
    Current.url_aliases = UrlAlias.lang.map { |ua| [ua.source, ua.alias] }.to_h
  end

  def set_url_alias
    @url_alias = UrlAlias.lang.find_by(alias: params[:path].gsub('.json', ''))
  end

  def set_node
    @node = Node.active.find(@url_alias.source.split('/').last) if @url_alias.source.start_with?('node/')
  end

  def set_global_navs
    @header_navs = Nav.active.main.lang

    @footer_navs = Nav.active.main_or_sec.lang.unscope(:order)
      .order(menu_name: :desc, weight: :asc)

    @footer = Nav.active.footer.lang.unscope(:order)
      .order(menu_name: :desc, weight: :asc)
  end
end

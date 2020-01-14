class ApplicationController < ActionController::Base
  around_action :switch_locale
  before_action :set_url_aliases

  private

  def switch_locale(&action)
    locale = params[:locale] || I18n.default_locale
    I18n.with_locale(locale, &action)
  end

  def set_url_aliases
    Current.url_aliases = UrlAlias.lang
  end

  def set_url_alias
    @url_alias = UrlAlias.lang.find_by(alias: params[:path].gsub('.json', ''))
  end

  def set_node
    @node = Node.find(@url_alias.source.split('/').last) if @url_alias.source.start_with?('node/')
  end
end

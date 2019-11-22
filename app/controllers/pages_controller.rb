class PagesController < ApplicationController
  before_action :set_url_alias
  before_action :set_node

  private

  def set_url_alias
    @url_alias = UrlAlias.find_by(alias: params[:path])
  end

  def set_node
    @node = Node.find(@url_alias.source.split('/').last) if @url_alias.source.start_with?('node/')
  end
end

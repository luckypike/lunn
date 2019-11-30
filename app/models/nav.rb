class Nav < ApplicationRecord
  self.table_name = 'menu_links'
  self.inheritance_column = :_type_disabled

  # scope :main, -> { where(menu_name: 'menu-front-top-menu') }

  default_scope { order(weight: :asc) }

  scope :main, -> { where(menu_name: 'menu-main-nav') }
  scope :sec, -> { where(menu_name: 'menu-sec-nav') }
  scope :lang, ->(locale = nil) { where(language: locale || I18n.locale) }
  scope :depth, ->(depth) { where(depth: depth) }

  def path
    UrlAlias.alias_path link_path
  end

  def title
    link_title
  end
end

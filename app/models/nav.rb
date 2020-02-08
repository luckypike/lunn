class Nav < ApplicationRecord
  self.table_name = 'menu_links'
  self.inheritance_column = :_type_disabled

  attr_accessor :image

  # scope :main, -> { where(menu_name: 'menu-front-top-menu') }

  default_scope { order(weight: :asc) }

  scope :active, -> { where(hidden: 0) }
  scope :main, -> { where(menu_name: 'menu-main-nav') }
  scope :sec, -> { where(menu_name: 'menu-sec-nav') }
  scope :footer, -> { where(menu_name: 'menu-footer-nav') }
  scope :main_or_sec, -> { where(menu_name: %w[menu-sec-nav menu-main-nav]) }
  scope :lang, ->(locale = nil) { where(language: locale || I18n.locale) }
  scope :depth, ->(depth) { where(depth: depth) }

  scope :loaf, -> { unscope(:order).order(has_children: :desc, menu_name: :asc) }

  def path
    if mlid == 4708
      'en/page/study-russian-lunn'
    else
      (I18n.locale != I18n.default_locale ? I18n.locale : nil).to_s +
        UrlAlias.alias_path(link_path)
    end
  end

  def title
    link_title
  end

  def link_nid
    link_path.sub('node/', '').to_i
  end
end

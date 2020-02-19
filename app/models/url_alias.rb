class UrlAlias < ApplicationRecord
  self.table_name = 'url_alias'

  scope :lang, ->(locale = nil) { where(language: locale || I18n.locale) }

  class << self
    def alias_path(source)
      url_alias = Current.url_aliases[source]

      "/#{url_alias.presence || source}"
    end
  end
end

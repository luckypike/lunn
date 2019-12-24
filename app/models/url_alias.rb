class UrlAlias < ApplicationRecord
  self.table_name = 'url_alias'

  scope :lang, ->(locale = nil) { where(language: locale || I18n.locale) }

  class << self
    def alias_path(source)
      url_alias = Current.url_aliases.detect { |ua| ua.source == source }

      url_alias ? "/#{url_alias.alias}" : source
    end
  end
end

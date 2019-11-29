class UrlAlias < ApplicationRecord
  self.table_name = 'url_alias'

  scope :lang, ->(locale = nil) { where(language: locale || I18n.locale) }

  class << self
    def alias_path(source)
      # url_alias = UrlAlias.select(:alias).lang.find_by(source: source)
      url_alias = url_aliases.detect { |ua| ua.source == source }

      url_alias ? "/#{url_alias.alias}" : source
    end

    def url_aliases
      @url_aliases ||= UrlAlias.lang
    end
  end
end

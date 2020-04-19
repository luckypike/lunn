module ApplicationHelper
  def special_cookie_classes
    classes = []

    cookies[:specialSettingsFont] &&
      classes << "font_#{cookies[:specialSettingsFont]}"

    cookies[:specialSettingsSpacing] &&
      classes << "spacing_#{cookies[:specialSettingsSpacing]}"

    cookies[:specialSettingsSchema] &&
      classes << "schema_#{cookies[:specialSettingsSchema]}"

    classes
  end

  def index?(node)
    current_page?(root_url) || (node && [4734].include?(node.nid))
  end

  def load_partners
    ActiveRecord::Base.connection.exec_query('SELECT body FROM block_custom WHERE bid = 8').first
  end
end

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
end

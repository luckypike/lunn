I18n.load_path += Dir[Rails.root.join('config', 'locales', '**', '*.{rb,yml}')]

I18n.available_locales = %i[ru en]

I18n.default_locale = :ru

class I18nComponentMount < React::Rails::ComponentMount
  def react_component(name, props = {}, options = {}, &block)
    props[:locale] = I18n.locale

    super
  end
end

Rails.application.configure do
  # config.i18n.fallbacks = [I18n.default_locale]

  config.react.view_helper_implementation = I18nComponentMount
end

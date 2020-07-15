class ApplicationMailer < ActionMailer::Base
  default from: "#{I18n.t('mailers.from')} <#{Rails.application.credentials.dig(:mail, :yandex, :username)}>"
  layout 'mailer'
end

class ApplicationMailer < ActionMailer::Base
  default from: "#{I18n.t('mailers.from')} <#{Rails.application.credentials.dig(:mail, :username)}>"
  layout 'mailer'
end

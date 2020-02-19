class ApplicationMailer < ActionMailer::Base
  default from: "Лингвистический университет <#{Rails.application.credentials.dig(:mail, :username)}>"
  layout 'mailer'
end

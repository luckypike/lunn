class FeedbackMailer < ApplicationMailer
  def notify
    @feedback = params[:feedback]

    mail(
      to: Rails.env.production? && @feedback.address.present? ? @feedback.address : 'log+lunn@luckypike.com',
      reply_to: @feedback.email,
      subject: "Сообщение от #{@feedback.name} с сайта lunn.ru"
    )
  end
end

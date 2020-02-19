namespace :feedback do
  desc 'Send pending feedback to email'

  task notify: :environment do
    Feedback.pending.map(&:notify)
  end
end

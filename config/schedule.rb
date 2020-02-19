env :PATH, ENV['PATH']

every 10.minutes do
  rake 'feedback:notify'
end

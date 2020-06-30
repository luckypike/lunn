lock '~> 3'

set :application, 'lunn'
set :repo_url, 'git@github.com:luckypike/lunn.git'

set :deploy_to, '/home/deploy/apps/lunn.ru'

append :linked_files, 'config/database.yml', 'config/master.key'

append :linked_dirs, 'log', 'tmp/pids', 'tmp/cache', 'tmp/sockets', 'public/system', 'public/uploads', 'public/abitur'

set :keep_releases, 3

set :ssh_options, forward_agent: true

Rake::Task['deploy:assets:backup_manifest'].clear_actions

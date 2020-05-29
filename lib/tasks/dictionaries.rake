namespace :dictionaries do
  desc "create dictionaries"
  task citizenship: :environment do
    require 'csv'
    CSV.foreach(Rails.root.join('config', 'citizenship.csv'), col_sep: ';') do |row|
      Citizenship.where(id: row[0], title: row[1], desc: row[2]).first_or_create
    end
  end
end

namespace :dictionaries do
  desc "create dictionaries"
  task citizenship: :environment do
    require 'csv'
    CSV.foreach(Rails.root.join('config', 'citizenship.csv'), col_sep: ';') do |row|
      Citizenship.where(id: row[0], title: row[1], desc: row[2]).first_or_create
    end
  end

  task subject: :environment do
    require 'csv'
    CSV.foreach(Rails.root.join('config', 'subjects.csv'), col_sep: ';') do |row|
      Subject.where(id: row[0], title: row[1], desc: row[2]).first_or_create
    end
  end

  task achievement: :environment do
    require 'csv'
    CSV.foreach(Rails.root.join('config', 'achievement.csv'), col_sep: ';') do |row|
      Achievement.where(id: row[0], title: row[1]).first_or_create do |achievement|
        achievement.subject_id = row[2] if row[2] != '0'
      end
    end
  end
end

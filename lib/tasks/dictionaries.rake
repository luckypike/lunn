namespace :dictionaries do
  desc "create dictionaries"
  task citizenship: :environment do
    require 'csv'
    CSV.foreach(Rails.root.join('config', 'citizenships.csv'), col_sep: ';') do |row|
      AdmissionCitizenship.where(id: row[0], title: row[1], desc: row[2]).first_or_create
    end
  end

  task subject: :environment do
    require 'csv'
    CSV.foreach(Rails.root.join('config', 'subjects.csv'), col_sep: ';') do |row|
      AdmissionSubject.where(id: row[0], title: row[1], desc: row[2]).first_or_create
    end
  end

  task achievement: :environment do
    require 'csv'
    CSV.foreach(Rails.root.join('config', 'achievements.csv'), col_sep: ';') do |row|
      AdmissionAchievement.where(id: row[0], title: row[1]).first_or_create do |achievement|
        achievement.admission_subject_id = row[2] if row[2] != '0'
      end
    end
  end

  task direction: :environment do
    require 'csv'
    CSV.foreach(Rails.root.join('config', 'directions.csv'), col_sep: ';') do |row|
      AdmissionDirection.where(title: row[0], desc: row[1]).first_or_create
    end
  end
end

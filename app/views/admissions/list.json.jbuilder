json.cache! 'admissions/list', expires_in: 1.hour do
  json.list(@list.sort_by { |a| [a[:family]] }) do |row|
    json.extract! row, :id

    json.first_name row[:firstname].squish
    json.family_name row[:family].squish
    json.middle_name row[:secname].squish

    json.profiles (1..40).to_a do |i|
      if row["profil_#{i}"].present?
        json.profile row["profil_#{i}"][6..-1].squish
        json.type row["profil_#{i}"][1].squish
        json.form row["form_#{i}"].squish
        json.tax row["tax_#{i}"].squish
        json.soglasiye row["soglasiye_#{i}"].to_i

        @profiles << { profile: row["profil_#{i}"][6..-1].squish, form: row["form_#{i}"].strip, tax: row["tax_#{i}"].strip, type: row["profil_#{i}"][1].squish }

        json.categorob row["categorob_#{i}"]
        @categories << row["categorob_#{i}"]
      end
    end

    @subjects_all = []
    @achievements_all = []

    json.subjects (1..40).to_a do |s|
      if row["subject_#{s}"].present?
        json.id s
        json.subject row["subject_#{s}"].squish
        json.grade row["subject_ball_#{s}"].squish
        @subjects_all << row["subject_ball_#{s}"].squish.to_i
      end
    end

    json.achievements (1..16).to_a do |a|
      if row["achievement_#{a}"].present?
        json.id a
        json.achievement row["achievement_#{a}"].squish
        json.grade row["achievement_ball_#{a}"].squish
        @achievements_all << row["achievement_ball_#{a}"].squish.to_i
      end
    end

    json.subjects_all @subjects_all.sum
    json.achievements_all @achievements_all.sum
  end

  json.profiles(@profiles.uniq.sort_by { |p| [p[:profile], p[:form], p[:tax]] })
  json.categories @categories.uniq
  json.types ['Бакалавриат', 'Специалитет', 'Магистратура', 'Аспирантура']
end

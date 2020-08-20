json.cache! 'admissions/list', expires_in: 1.hour do
  json.list(@list.sort_by { |a| [a[:family]] }) do |row|
    json.extract! row, :id

    json.first_name row[:firstname].squish
    json.family_name row[:family].squish
    json.middle_name row[:secname].squish

    json.profiles (1..40).to_a do |i|
      if row["profil_#{i}"].present?
        json.id row["profil_id_#{i}"].squish.to_i
        json.profile row["profil_#{i}"][6..-1].squish
        json.type row["profil_#{i}"][1].squish
        json.form row["form_#{i}"].squish
        json.tax row["tax_#{i}"].squish
        json.overall row["summball_itog_#{i}"].squish.to_i
        json.grades row["summball_exam_#{i}"].squish.to_i
        json.achievements row["summball_achievement_#{i}"].squish.to_i
        json.soglasiye row["soglasiye_#{i}"].to_i
        json.admission row["profil_id_#{i}"].squish.to_i == row['profil_id_zachisleniye'].squish.to_i

        @profiles << { profile: row["profil_#{i}"][6..-1].squish, form: row["form_#{i}"].strip, tax: row["tax_#{i}"].strip, type: row["profil_#{i}"][1].squish, id: row["profil_id_#{i}"].squish.to_i, order: @order[row["profil_id_#{i}"].squish.to_i] ? @order[row["profil_id_#{i}"].squish.to_i] : [1, 2, 3] }

        json.categorob row["categorob_#{i}"]
        json.foreign false
        if row["categorob_#{i}"] == 'Иностранные граждане'
          json.categorob 'По общему конкурсу'
          json.foreign true
        end
        @categories << row["categorob_#{i}"]
      end
    end

    @subjects_all = []
    @subjects = []
    @foreign = 0

    (1..40).to_a.each do |s|
      if row["subject_#{s}"].present?
        id = row["subject_id_#{s}"].squish.to_i
        grade = row["subject_ball_#{s}"].squish.to_i
        @subjects << { id: id, subject: row["subject_#{s}"].squish, grade: grade }
        @subjects_all << row["subject_ball_#{s}"].squish.to_i

        if [49, 50].include?(id)
          @foreign += grade
        end

        if [3, 4, 5, 6, 7, 8, 9, 49, 50].include?(id)
          @foreign = @foreign < grade ? grade : @foreign
        end
      end
    end

    if @foreign > 0
      @subjects << { id: 99, subject: 'Иностранный язык', grade: @foreign }
    end

    json.subjects @subjects



    json.achievements (1..16).to_a do |a|
      if row["achievement_#{a}"].present?
        json.id a
        json.achievement row["achievement_#{a}"].squish
        json.grade row["achievement_ball_#{a}"].squish
      end
    end
  end

  json.profiles(@profiles.uniq.sort_by { |p| [p[:profile], p[:form], p[:tax], p[:order]] })
  json.categories @categories.uniq
  json.types ['Бакалавриат', 'Специалитет', 'Магистратура', 'Аспирантура']

  json.exams @exams.each do |row|
    json.profile row[:ProfilId].to_i
    json.exam row[:SubjectId].to_i
  end
end

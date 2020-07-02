json.cache! 'admissions/list', expires_in: 1.hour do
  json.list(@list.sort_by { |a| [a[:family]] }) do |row|
    json.extract! row, :id

    json.first_name row[:firstname].squish
    json.family_name row[:family].squish
    json.middle_name row[:secname].squish

    json.profiles (1..40).to_a do |i|
      if row["profil_#{i}"].present?
        json.profile row["profil_#{i}"].squish
        json.form row["form_#{i}"].squish
        json.tax row["tax_#{i}"].squish

        @profiles << { profile: row["profil_#{i}"].squish, form: row["form_#{i}"].strip, tax: row["tax_#{i}"].strip }
        # @profiles << row["profil_#{i}"].squish

        json.categorob row["categorob_#{i}"]
        @categories << row["categorob_#{i}"]
      end
    end
  end

  json.profiles(@profiles.uniq.sort_by { |p| [p[:profile], p[:form], p[:tax]] })
  json.categories @categories.uniq
end

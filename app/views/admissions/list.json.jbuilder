json.cache! @list, expires_in: 1.hour do
  @profiles = []
  @categories = []

  json.list @list do |row|
    json.extract! row, :id, :family
    json.profiles (1..40).to_a do |i|
      if row["profil_#{i}"].present?
        json.profile row["profil_#{i}"].strip
        json.form row["form_#{i}"].strip
        json.tax row["tax_#{i}"].strip

        @profiles << { profile: row["profil_#{i}"].strip, form: row["form_#{i}"].strip, tax: row["tax_#{i}"].strip }

        json.categorob row["categorob_#{i}"]
        @categories << row["categorob_#{i}"]
      end
    end
  end

  json.profiles @profiles.uniq
  json.categories @categories.uniq
end

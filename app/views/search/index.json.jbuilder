json.results @records.each_with_hit do |record, hit|
  json.partial! record
  json.highlight(
    if hit.try(:highlight).try('body.sanitized')
      hit.highlight['body.sanitized'].first
    else
      record.body&.sanitized&.truncate(140, separator: ' ')
    end
  )
end

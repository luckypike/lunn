json.extract! admission_document, :id, :title, :uuid, :section
json.file do
  json.url admission_document.file.url
  json.thumb do
    json.url admission_document.file.thumb.url
  end
end

json.event do
  json.partial! @event
  json.text @event.text

  json.images @event.images do |image|
    json.partial! image
    json.path "#{image.attachment.host}styles/embedded_main/public/#{image.attachment.path}"
  end
end

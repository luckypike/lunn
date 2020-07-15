class EventSerializer
  include FastJsonapi::ObjectSerializer

  attributes :nid, :title, :path, :created

  attribute :date do |event|
    event.date.value
  end
end

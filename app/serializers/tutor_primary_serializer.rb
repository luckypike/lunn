class TutorPrimarySerializer
  include FastJsonapi::ObjectSerializer

  attributes :id, :first_name, :middle_name, :last_name, :position
end

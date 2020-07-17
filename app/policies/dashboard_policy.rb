DashboardPolicy = Struct.new :user, :dashboard do
  def index?
    user&.role?(:editor)
  end
end

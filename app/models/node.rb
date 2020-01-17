class Node < ApplicationRecord
  self.table_name = 'node'
  self.inheritance_column = :_type_disabled
  self.ignored_columns = %w[changed]

  enum status: { published: 1 }

  has_one :body, -> { where(entity_type: :node) }, dependent: :destroy, foreign_key: :entity_id, inverse_of: :node
  has_one :summary, -> { where(entity_type: :node) }, dependent: :destroy, foreign_key: :entity_id, inverse_of: :node
  has_one :dates, -> { where(entity_type: :node) }, dependent: :destroy, foreign_key: :entity_id, inverse_of: :node
  has_one :date, -> { where(entity_type: :node) }, dependent: :destroy, foreign_key: :entity_id, inverse_of: :node
  has_many :images, -> { includes(:attachment).where(entity_type: :node) }, dependent: :destroy, foreign_key: :entity_id, inverse_of: :node
  has_one :image, -> { includes(:attachment).where(entity_type: :node) }, class_name: 'SingleImage', dependent: :destroy, foreign_key: :entity_id, inverse_of: :node
  has_many :docs, -> { includes(:attachment).where(entity_type: :node) }, dependent: :destroy, foreign_key: :entity_id, inverse_of: :node

  has_one :field_price_1, -> { where(entity_type: :node) }, class_name: 'Field::Price1', foreign_key: :entity_id
  has_one :field_price_2, -> { where(entity_type: :node) }, class_name: 'Field::Price2', foreign_key: :entity_id
  has_one :field_price_3, -> { where(entity_type: :node) }, class_name: 'Field::Price3', foreign_key: :entity_id

  has_one :field_time_1, -> { where(entity_type: :node) }, class_name: 'Field::Time1', foreign_key: :entity_id
  has_one :field_time_2, -> { where(entity_type: :node) }, class_name: 'Field::Time2', foreign_key: :entity_id
  has_one :field_time_3, -> { where(entity_type: :node) }, class_name: 'Field::Time3', foreign_key: :entity_id

  has_one :field_places_1, -> { where(entity_type: :node) }, class_name: 'Field::Places1', foreign_key: :entity_id
  has_one :field_places_2, -> { where(entity_type: :node) }, class_name: 'Field::Places2', foreign_key: :entity_id
  has_one :field_places_3, -> { where(entity_type: :node) }, class_name: 'Field::Places3', foreign_key: :entity_id

  has_one :field_spec, -> { where(entity_type: :node) }, class_name: 'Field::Spec', foreign_key: :entity_id
  has_one :field_level, -> { where(entity_type: :node) }, class_name: 'Field::Level', foreign_key: :entity_id
  has_one :field_youtube, -> { where(entity_type: :node) }, class_name: 'Field::Youtube', foreign_key: :entity_id

  has_many :field_ege, -> { where(entity_type: :node) }, class_name: 'Field::Ege', foreign_key: :entity_id

  scope :news, -> { where(type: :news) }
  scope :employees, -> { where(type: :employee) }
  scope :courses, -> { where(type: :course) }
  scope :events, -> { where(type: %i[news event]) }
  scope :sliders, -> { where(type: :slider_item) }
  scope :lang, ->(locale = nil) { where(language: locale || I18n.locale) }

  scope :with_prices, -> { includes(:field_price_1, :field_price_2, :field_price_3) }
  scope :with_times, -> { includes(:field_time_1, :field_time_2, :field_time_3) }
  scope :with_places, -> { includes(:field_places_1, :field_places_2, :field_places_3) }

  def path
    UrlAlias.alias_path "node/#{nid}"
  end

  def text
    body&.field_body_value
  end

  def desc
    summary&.field_summary_value
  end

  def price_1
    field_price_1&.value
  end

  def price_2
    field_price_2&.value
  end

  def price_3
    field_price_3&.value
  end

  def spec
    field_spec&.value
  end

  def level
    field_level&.value
  end

  def time_1
    field_time_1&.value
  end

  def time_2
    field_time_2&.value
  end

  def time_3
    field_time_3&.value
  end

  def places_1
    field_places_1&.value
  end

  def places_2
    field_places_2&.value
  end

  def places_3
    field_places_3&.value
  end

  def youtube
    field_youtube&.value
  end

  def ege
    field_ege.map(&:value)
  end

  def navs
    mlid = Nav.main_or_sec.loaf.find_by(link_path: "node/#{id}")&.mlid
    Nav.lang.where(plid: mlid)
  end

  def loaf
    mlids = Nav.main_or_sec.loaf.find_by(link_path: "node/#{id}")
      &.slice(:p1, :p2, :p3, :p4, :p5, :p6, :p7, :p8, :p9)&.values

    Nav.main_or_sec.where(mlid: mlids).unscope(:order).order(depth: :asc)
  end
end

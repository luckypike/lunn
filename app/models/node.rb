class Node < ApplicationRecord
  include Elasticsearch::Model
  include Elasticsearch::Model::Callbacks

  self.table_name = 'node'
  self.inheritance_column = :_type_disabled
  self.ignored_columns = %w[changed]

  enum status: { published: 1 }

  has_one :body, -> { where(entity_type: :node) }, dependent: :destroy, foreign_key: :entity_id, inverse_of: :node
  has_one :summary, -> { where(entity_type: :node) }, dependent: :destroy, foreign_key: :entity_id, inverse_of: :node
  has_one :dates, -> { where(entity_type: :node) }, dependent: :destroy, foreign_key: :entity_id, inverse_of: :node
  has_one :date, -> { where(entity_type: :node) }, dependent: :destroy, foreign_key: :entity_id, inverse_of: :node
  has_one :link, -> { where(entity_type: :node) }, dependent: :destroy, foreign_key: :entity_id, inverse_of: :node
  has_one :menu_open, -> { where(entity_type: :node) }, dependent: :destroy, foreign_key: :entity_id, inverse_of: :node
  has_many :images, -> { includes(:attachment).where(entity_type: :node) }, dependent: :destroy, foreign_key: :entity_id, inverse_of: :node
  has_one :image, -> { includes(:attachment).where(entity_type: :node) }, class_name: 'SingleImage', dependent: :destroy, foreign_key: :entity_id, inverse_of: :node
  has_many :docs, -> { includes(:attachment).where(entity_type: :node) }, dependent: :destroy, foreign_key: :entity_id, inverse_of: :node

  has_many :departments, -> { where(entity_type: :node) }, dependent: :destroy, foreign_key: :field_department_target_id, inverse_of: :node
  has_many :tutors, through: :departments

  scope :news, -> { where(type: :news) }
  # scope :employees, -> { where(type: :employee) }
  # scope :courses, -> { where(type: :course) }
  scope :events, -> { where(type: %i[news event]) }
  scope :sliders, -> { where(type: :slider_item) }
  # scope :divisions, -> { where(type: :division) }
  # scope :ugsns, -> { where(type: :ugsn) }
  scope :lang, ->(locale = nil) { where(language: locale || I18n.locale) }

  scope :active, -> { where(status: 1) }

  scope :with_prices, -> { includes(:field_price_1, :field_price_2, :field_price_3) }
  scope :with_times, -> { includes(:field_time_1, :field_time_2, :field_time_3) }
  scope :with_places, -> { includes(:field_places_1, :field_places_2, :field_places_3) }

  settings do
    mappings dynamic: false do
      indexes :title, fields: {
        ru: { analyzer: :russian, type: :text },
        en: { analyzer: :english, type: :text }
      }

      indexes :body, type: :object do
        indexes :sanitized, fields: {
          ru: { analyzer: :russian, type: :text },
          en: { analyzer: :english, type: :text }
        }
      end
    end
  end

  def path
    if type == 'event'
      "/events/#{nid}"
    elsif type == 'news'
      "/news/#{nid}"
    elsif type == 'employee'
      "/tutors/#{nid}"
    else
      UrlAlias.alias_path("node/#{nid}")
    end
  end

  def text
    body&.field_body_value
  end

  def desc
    summary&.field_summary_value
  end

  def menu_open?
    menu_open&.value
  end

  def dep?
    l = loaf
    (l[3].present? && l[2].plid == 4687)
  end

  def navs
    mlid = Nav.main_or_sec.loaf.find_by(link_path: "node/#{id}")&.mlid
    temp = Nav.active.lang.where(plid: mlid).map

    navs_images = Node::SingleImage
      .where(
        entity_type: :node,
        entity_id: temp.map(&:link_nid).reject(&:zero?)
      ).includes(:attachment)

    temp.map do |nav|
      nav.image = navs_images.detect do |ni|
        ni.entity_id == nav.link_nid
      end&.attachment&.path
    end

    temp
  end

  def loaf
    mlids = Nav.main_or_sec.loaf.find_by(link_path: "node/#{id}")
      &.slice(:p1, :p2, :p3, :p4, :p5, :p6, :p7, :p8, :p9)&.values

    Nav.main_or_sec.where(mlid: mlids).unscope(:order).order(depth: :asc)
  end

  def as_indexed_json(_options = {})
    as_json(
      include: { body: { only: :field_body_value, methods: :sanitized } }
    )
  end
end

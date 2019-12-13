class Node < ApplicationRecord
  self.table_name = 'node'
  self.inheritance_column = :_type_disabled
  self.ignored_columns = %w[changed]

  has_one :body, -> { where(entity_type: :node) }, dependent: :destroy, foreign_key: :entity_id, inverse_of: :node
  has_many :images, -> { includes(:attachment).where(entity_type: :node) }, dependent: :destroy, foreign_key: :entity_id, inverse_of: :node
  has_many :docs, -> { includes(:attachment).where(entity_type: :node) }, dependent: :destroy, foreign_key: :entity_id, inverse_of: :node

  scope :news, -> { where(type: :news) }
  scope :events, -> { where(type: :event) }
  scope :lang, ->(locale = nil) { where(language: locale || I18n.locale) }

  def path
    UrlAlias.alias_path "node/#{nid}"
  end

  def text
    body&.field_body_value
  end

  def navs
    mlid = Nav.main_or_sec.find_by(link_path: "node/#{id}")&.mlid
    Nav.lang.where(plid: mlid)
  end

  def loaf
    mlids = Nav.main_or_sec.find_by(link_path: "node/#{id}")
      .slice(:p1, :p2, :p3, :p4, :p5, :p6, :p7, :p8, :p9).values

    Nav.main_or_sec.where(mlid: mlids).unscope(:order).order(depth: :asc)
  end
end

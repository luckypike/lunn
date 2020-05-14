# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_04_15_131704) do

  create_table "admissions", options: "ENGINE=InnoDB DEFAULT CHARSET=latin1", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "first_name"
    t.string "middle_name"
    t.string "last_name"
    t.integer "state"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_admissions_on_user_id"
  end

  create_table "file_managed", primary_key: "fid", id: :integer, unsigned: true, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", comment: "Stores information for uploaded files.", force: :cascade do |t|
    t.integer "uid", default: 0, null: false, comment: "The users.uid of the user who is associated with the file.", unsigned: true
    t.string "filename", default: "", null: false, comment: "Name of the file with no path components. This may differ from the basename of the URI if the file is renamed to avoid overwriting an existing file."
    t.string "uri", default: "", null: false, collation: "utf8_bin", comment: "The URI to access the file (either local or remote)."
    t.string "filemime", default: "", null: false, comment: "The file’s MIME type."
    t.bigint "filesize", default: 0, null: false, comment: "The size of the file in bytes.", unsigned: true
    t.integer "status", limit: 1, default: 0, null: false, comment: "A field indicating the status of the file. Two status are defined in core: temporary (0) and permanent (1). Temporary files older than DRUPAL_MAXIMUM_TEMP_FILE_AGE will be removed during a cron run."
    t.integer "timestamp", default: 0, null: false, comment: "UNIX timestamp for when the file was added.", unsigned: true
    t.string "type", limit: 50, default: "undefined", null: false, comment: "The type of this file."
    t.index ["status"], name: "status"
    t.index ["timestamp"], name: "timestamp"
    t.index ["type"], name: "file_type"
    t.index ["uid"], name: "uid"
    t.index ["uri"], name: "uri", unique: true
  end

  create_table "invoices", options: "ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci", force: :cascade do |t|
    t.string "last_name"
    t.string "first_name"
    t.string "middle_name"
    t.string "contract"
    t.string "payment_id"
    t.decimal "payment_amount", precision: 10
    t.timestamp "payed_at"
    t.integer "state"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "menu_links", primary_key: "mlid", id: :integer, unsigned: true, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", comment: "Contains the individual links within a menu.", force: :cascade do |t|
    t.string "menu_name", limit: 32, default: "", null: false, comment: "The menu name. All links with the same menu name (such as ’navigation’) are part of the same menu."
    t.integer "plid", default: 0, null: false, comment: "The parent link ID (plid) is the mlid of the link above in the hierarchy, or zero if the link is at the top level in its menu.", unsigned: true
    t.string "link_path", default: "", null: false, comment: "The Drupal path or external path this link points to."
    t.string "router_path", default: "", null: false, comment: "For links corresponding to a Drupal path (external = 0), this connects the link to a menu_router.path for joins."
    t.string "link_title", default: "", null: false, comment: "The text displayed for the link, which may be modified by a title callback stored in menu_router."
    t.binary "options", comment: "A serialized array of options to be passed to the url() or l() function, such as a query string or HTML attributes."
    t.string "module", default: "system", null: false, comment: "The name of the module that generated this link."
    t.integer "hidden", limit: 2, default: 0, null: false, comment: "A flag for whether the link should be rendered in menus. (1 = a disabled menu item that may be shown on admin screens, -1 = a menu callback, 0 = a normal, visible link)"
    t.integer "external", limit: 2, default: 0, null: false, comment: "A flag to indicate if the link points to a full URL starting with a protocol, like http:// (1 = external, 0 = internal)."
    t.integer "has_children", limit: 2, default: 0, null: false, comment: "Flag indicating whether any links have this link as a parent (1 = children exist, 0 = no children)."
    t.integer "expanded", limit: 2, default: 0, null: false, comment: "Flag for whether this link should be rendered as expanded in menus - expanded links always have their child links displayed, instead of only when the link is in the active trail (1 = expanded, 0 = not expanded)"
    t.integer "weight", default: 0, null: false, comment: "Link weight among links in the same menu at the same depth."
    t.integer "depth", limit: 2, default: 0, null: false, comment: "The depth relative to the top level. A link with plid == 0 will have depth == 1."
    t.integer "customized", limit: 2, default: 0, null: false, comment: "A flag to indicate that the user has manually created or edited the link (1 = customized, 0 = not customized)."
    t.integer "p1", default: 0, null: false, comment: "The first mlid in the materialized path. If N = depth, then pN must equal the mlid. If depth > 1 then p(N-1) must equal the plid. All pX where X > depth must equal zero. The columns p1 .. p9 are also called the parents.", unsigned: true
    t.integer "p2", default: 0, null: false, comment: "The second mlid in the materialized path. See p1.", unsigned: true
    t.integer "p3", default: 0, null: false, comment: "The third mlid in the materialized path. See p1.", unsigned: true
    t.integer "p4", default: 0, null: false, comment: "The fourth mlid in the materialized path. See p1.", unsigned: true
    t.integer "p5", default: 0, null: false, comment: "The fifth mlid in the materialized path. See p1.", unsigned: true
    t.integer "p6", default: 0, null: false, comment: "The sixth mlid in the materialized path. See p1.", unsigned: true
    t.integer "p7", default: 0, null: false, comment: "The seventh mlid in the materialized path. See p1.", unsigned: true
    t.integer "p8", default: 0, null: false, comment: "The eighth mlid in the materialized path. See p1.", unsigned: true
    t.integer "p9", default: 0, null: false, comment: "The ninth mlid in the materialized path. See p1.", unsigned: true
    t.integer "updated", limit: 2, default: 0, null: false, comment: "Flag that indicates that this link was generated during the update from Drupal 5."
    t.string "language", limit: 12, default: "und", null: false
    t.integer "i18n_tsid", default: 0, null: false, unsigned: true
    t.index ["link_path", "menu_name"], name: "path_menu", length: { link_path: 128 }
    t.index ["menu_name", "p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8", "p9"], name: "menu_parents"
    t.index ["menu_name", "plid", "expanded", "has_children"], name: "menu_plid_expand_child"
    t.index ["router_path"], name: "router_path", length: 128
  end

  create_table "node", primary_key: "nid", id: :integer, unsigned: true, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", comment: "The base table for nodes.", force: :cascade do |t|
    t.integer "vid", comment: "The current node_revision.vid version identifier.", unsigned: true
    t.string "type", limit: 32, default: "", null: false, comment: "The node_type.type of this node."
    t.string "language", limit: 12, default: "", null: false, comment: "The languages.language of this node."
    t.string "title", default: "", null: false, comment: "The title of this node, always treated as non-markup plain text."
    t.integer "uid", default: 0, null: false, comment: "The users.uid that owns this node; initially, this is the user that created it."
    t.integer "status", default: 1, null: false, comment: "Boolean indicating whether the node is published (visible to non-administrators)."
    t.integer "created", default: 0, null: false, comment: "The Unix timestamp when the node was created."
    t.integer "changed", default: 0, null: false, comment: "The Unix timestamp when the node was most recently saved."
    t.integer "comment", default: 0, null: false, comment: "Whether comments are allowed on this node: 0 = no, 1 = closed (read only), 2 = open (read/write)."
    t.integer "promote", default: 0, null: false, comment: "Boolean indicating whether the node should be displayed on the front page."
    t.integer "sticky", default: 0, null: false, comment: "Boolean indicating whether the node should be displayed at the top of lists in which it appears."
    t.integer "tnid", default: 0, null: false, comment: "The translation set id for this node, which equals the node id of the source post in each set.", unsigned: true
    t.integer "translate", default: 0, null: false, comment: "A boolean indicating whether this translation page needs to be updated."
    t.integer "rh_action", comment: "Specifies which action that Rabbit Hole should take."
    t.text "rh_redirect", size: :long, comment: "The path to where the user should get redirected to."
    t.integer "rh_redirect_response", comment: "Specifies the HTTP response code that should be used when perform a redirect."
    t.index ["changed"], name: "node_changed"
    t.index ["created"], name: "node_created"
    t.index ["language"], name: "language"
    t.index ["promote", "status", "sticky", "created"], name: "node_frontpage"
    t.index ["status", "type", "nid"], name: "node_status_type"
    t.index ["title", "type"], name: "node_title_type", length: { type: 4 }
    t.index ["tnid"], name: "tnid"
    t.index ["translate"], name: "translate"
    t.index ["type"], name: "node_type", length: 4
    t.index ["uid"], name: "uid"
    t.index ["vid"], name: "vid", unique: true
  end

  create_table "url_alias", primary_key: "pid", id: :integer, unsigned: true, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", comment: "A list of URL aliases for Drupal paths; a user may visit...", force: :cascade do |t|
    t.string "source", default: "", null: false, comment: "The Drupal path this alias is for; e.g. node/12."
    t.string "alias", default: "", null: false, comment: "The alias for this path; e.g. title-of-the-story."
    t.string "language", limit: 12, default: "", null: false, comment: "The language this alias is for; if ’und’, the alias will be used for unknown languages. Each Drupal path can have an alias for each supported language."
    t.index ["alias", "language", "pid"], name: "alias_language_pid"
    t.index ["alias"], name: "alias"
    t.index ["language"], name: "index_url_alias_on_language"
    t.index ["source", "language", "pid"], name: "source_language_pid"
  end

  create_table "users", primary_key: "uid", id: :integer, default: 0, unsigned: true, options: "ENGINE=InnoDB DEFAULT CHARSET=utf8", comment: "Stores user data.", force: :cascade do |t|
    t.string "name", limit: 60, default: "", null: false, comment: "Unique user name."
    t.string "pass", limit: 128, default: "", null: false, comment: "User’s password (hashed)."
    t.string "mail", limit: 254, default: "", comment: "User’s e-mail address."
    t.string "theme", default: "", null: false, comment: "User’s default theme."
    t.string "signature", default: "", null: false, comment: "User’s signature."
    t.string "signature_format", comment: "The filter_format.format of the signature."
    t.integer "created", default: 0, null: false, comment: "Timestamp for when user was created."
    t.integer "access", default: 0, null: false, comment: "Timestamp for previous time user accessed the site."
    t.integer "login", default: 0, null: false, comment: "Timestamp for user’s last login."
    t.integer "status", limit: 1, default: 0, null: false, comment: "Whether the user is active(1) or blocked(0)."
    t.string "timezone", limit: 32, comment: "User’s time zone."
    t.string "language", limit: 12, default: "", null: false, comment: "User’s default language."
    t.integer "picture", default: 0, null: false, comment: "Foreign key: file_managed.fid of user’s picture."
    t.string "init", limit: 254, default: "", comment: "E-mail address used for initial account creation."
    t.binary "data", size: :long, comment: "A serialized array of name value pairs that are related to the user. Any form values posted during user edit are stored and are loaded into the $user object during user_load(). Use of this field is discouraged and it will likely disappear in a future..."
    t.index ["access"], name: "access"
    t.index ["created"], name: "created"
    t.index ["mail"], name: "mail"
    t.index ["name"], name: "name", unique: true
    t.index ["picture"], name: "picture"
  end

  add_foreign_key "admissions", "_users", column: "user_id"
end

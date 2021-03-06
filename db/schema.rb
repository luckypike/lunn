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

ActiveRecord::Schema.define(version: 2020_06_22_125819) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "admissions", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "first_name"
    t.string "middle_name"
    t.string "last_name"
    t.integer "state"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.json "identity"
    t.json "school"
    t.json "document"
    t.json "parents"
    t.json "address"
    t.json "score"
    t.json "course"
    t.json "residence"
    t.integer "status", default: 1
    t.json "agreements"
    t.json "features"
    t.index ["user_id"], name: "index_admissions_on_user_id"
  end

  create_table "invoices", force: :cascade do |t|
    t.string "last_name"
    t.string "first_name"
    t.string "middle_name"
    t.string "email"
    t.float "amount"
    t.string "number"
    t.string "uuid"
    t.string "contract"
    t.string "payment_id"
    t.float "payment_amount"
    t.datetime "payed_at"
    t.datetime "approved_at"
    t.integer "state", default: 1
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.text "desc"
    t.datetime "paid_on"
    t.string "payment_card"
    t.index ["last_name", "contract"], name: "index_invoices_on_last_name_and_contract"
    t.index ["number"], name: "index_invoices_on_number"
    t.index ["uuid"], name: "index_invoices_on_uuid", unique: true
  end

  create_table "payments", force: :cascade do |t|
    t.decimal "amount"
    t.text "desc"
    t.string "phone"
    t.string "name"
    t.string "number"
    t.string "email"
    t.string "fop"
    t.string "card_number"
    t.integer "pid"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "user_roles", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.integer "role"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_user_roles_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  add_foreign_key "admissions", "users"
  add_foreign_key "user_roles", "users"
end

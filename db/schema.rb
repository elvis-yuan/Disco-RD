# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2019_06_09_125020) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "channels", force: :cascade do |t|
    t.string "title", null: false
    t.integer "server_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.integer "dm_id"
    t.index ["server_id"], name: "index_channels_on_server_id"
  end

  create_table "direct_messages", force: :cascade do |t|
    t.integer "dmer_id", null: false
    t.integer "dmee_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["dmee_id"], name: "index_direct_messages_on_dmee_id"
    t.index ["dmer_id", "dmee_id"], name: "index_direct_messages_on_dmer_id_and_dmee_id"
    t.index ["dmer_id"], name: "index_direct_messages_on_dmer_id"
  end

  create_table "messages", force: :cascade do |t|
    t.string "body", null: false
    t.integer "user_id", null: false
    t.integer "channel_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["channel_id"], name: "index_messages_on_channel_id"
    t.index ["user_id"], name: "index_messages_on_user_id"
  end

  create_table "servers", force: :cascade do |t|
    t.string "title", null: false
    t.string "invitation_code", null: false
    t.string "icon_url"
    t.boolean "public", default: true
    t.integer "admin_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["invitation_code"], name: "index_servers_on_invitation_code"
  end

  create_table "user_servers", force: :cascade do |t|
    t.integer "user_id", null: false
    t.integer "server_id", null: false
    t.string "user_alias"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["server_id"], name: "index_user_servers_on_server_id"
    t.index ["user_id", "server_id"], name: "index_user_servers_on_user_id_and_server_id"
    t.index ["user_id"], name: "index_user_servers_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "email", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.string "user_icon_url"
    t.integer "direct_message_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end

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

ActiveRecord::Schema.define(version: 2019_11_08_145527) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "employees", force: :cascade do |t|
    t.string "job_group"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "reports", force: :cascade do |t|
    t.decimal "amount_paid"
    t.integer "report_id"
    t.bigint "employee_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.date "pay_start_date"
    t.date "pay_end_date"
    t.index ["employee_id"], name: "index_reports_on_employee_id"
    t.index ["pay_start_date", "pay_end_date", "amount_paid", "report_id"], name: "report_unique_index", unique: true
  end

  create_table "timespans", force: :cascade do |t|
    t.date "date"
    t.decimal "hours_worked"
    t.integer "report_id"
    t.bigint "employee_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["employee_id"], name: "index_timespans_on_employee_id"
  end

  add_foreign_key "reports", "employees"
  add_foreign_key "timespans", "employees"
end

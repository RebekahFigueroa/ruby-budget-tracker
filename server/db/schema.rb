# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2023_06_06_015332) do

  create_table "budget_events", force: :cascade do |t|
    t.integer "household_member_id"
    t.integer "budget_id"
    t.string "expense_type"
    t.integer "amount"
    t.datetime "purchase_date"
    t.string "notes"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["budget_id"], name: "index_budget_events_on_budget_id"
    t.index ["household_member_id"], name: "index_budget_events_on_household_member_id"
  end

  create_table "budgets", force: :cascade do |t|
    t.integer "household_id"
    t.integer "amount"
    t.string "name"
    t.index ["household_id"], name: "index_budgets_on_household_id"
  end

  create_table "household_members", force: :cascade do |t|
    t.integer "household_id"
    t.string "name"
    t.integer "income"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["household_id"], name: "index_household_members_on_household_id"
  end

  create_table "households", force: :cascade do |t|
    t.string "name"
  end

end

class Household < ActiveRecord::Base
  has_many :household_members
  has_many :budgets
end
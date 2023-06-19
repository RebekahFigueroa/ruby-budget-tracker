class Budget_event < ActiveRecord::Base
  belongs_to :household_member
  belongs_to :budget
end
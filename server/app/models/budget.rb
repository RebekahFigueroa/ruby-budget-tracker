class Budget < ActiveRecord::Base
  belongs_to :household
  has_many :budget_events
end
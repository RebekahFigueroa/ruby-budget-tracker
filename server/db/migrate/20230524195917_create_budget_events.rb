class CreateBudgetEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :budget_events do |t|
      t.belongs_to :household_member
      t.belongs_to :budget
      t.string :expense_type 
      t.integer :amount
      t.timestamp :purchase_date
      t.string :notes
      t.timestamps
    end 
  end
end

class CreateBudgetEvents < ActiveRecord::Migration[6.1]
  def change
    create_table :budget_events do |t|
      t.integer :household_member_id 
      t.string :expense_type
      t.string :purchase_type
      t.integer :amount
      t.timestamp :purchase_date
      t.string :notes
      t.timestamps
    end 
  end
end

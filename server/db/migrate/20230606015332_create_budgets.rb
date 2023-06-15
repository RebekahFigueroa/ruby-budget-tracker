class CreateBudgets < ActiveRecord::Migration[6.1]
  def change
    create_table :budgets do |t|
      t.belongs_to :household
      t.integer :amount
      t.string :name
    end
  end
end

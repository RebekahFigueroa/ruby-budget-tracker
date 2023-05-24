class CreateHouseholdMembers < ActiveRecord::Migration[6.1]
  def change
    create_table :household_members do |t|
      t.string :name
      t.integer :income
      t.timestamps
    end 
  end
end

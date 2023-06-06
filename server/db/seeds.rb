puts "🌱 Seeding spices..."

# Seed your database here
5.times do 

    #create households
    household = Household.create(
        name: Faker::Name.last_name + " Household"
    )

    # create a household member with random data
    household_member_ids = []
    rand(1..4).times do
        household_member = Household_member.create(
            household_id: household.id,   
            name: Faker::Name.name,  
            income: rand(15000..200000)
        )
        household_member_ids << household_member.id
    end

    #create household budgets
    budget_ids = []
    rand(1..5).times do
        budget = Budget.create(
            household_id: household.id, 
            amount: rand(1..5000),
            name: Faker::Lorem.sentence(word_count: rand(1..2)) + " Budget"
        )
        budget_ids << budget.id
    end 

    #create budget 1 to 10 budget events for each household member
    rand(1..10).times do
        Budget_event.create(
            household_member_id: household_member_ids[rand(0..household_member_ids.length)],
            budget_id: budget_ids[rand(0..budget_ids.length)],
            expense_type: rand(1..2) == 1 ? "household" : "personal",
            purchase_type: ["Housing", "Utilities", "Groceries", "Personal", "Eating Out", "Fun", "Health" "Pets", "Saving", "Investing", "Debt", "Other"][rand(0..11)],
            amount: rand(-2000..2000),
            purchase_date: Faker::Time.between(from: Date.today, to: Date.today+30),
            notes: Faker::Lorem.sentence(word_count: rand(5..10))
        )
    end 
end 

puts "✅ Done seeding!"

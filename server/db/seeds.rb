puts "🌱 Seeding spices..."

# Seed your database here
5.times do 
    # create a household member with random data
    household_member = Household_member.create(
      name: Faker::Name.name,  
      income: rand(15000..200000)
    )

    #create budget 1 to 10 budget events for each household member
    rand(1..10).times do
        Budget_event.create(
            household_member_id: household_member.id,
            expense_type: rand(1..2) == 1 ? "household" : "personal",
            purchase_type: ["grocery", "housing", "utility"][rand(0..2)],
            amount: rand(-2000..2000),
            purchase_date: Faker::Time.between(from: Date.today, to: Date.today+30),
            notes: Faker::Lorem.words(number: rand(5..10))
        )
    end 
end 

puts "✅ Done seeding!"

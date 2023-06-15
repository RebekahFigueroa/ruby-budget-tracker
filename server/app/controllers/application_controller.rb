class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  
  # Add your routes here
  get "/" do
    { message: "Good luck with your project!" }.to_json
  end

  # household routes 
  get "/households" do 
    household = Household.all.order(:created_at)
    household.to_json
  end 

  get "/households/:id" do 
    household = Household.find(params[:id])
    household.to_json
  end 

  post "/household" do 
    household = Household.create(
      name: params[:name])
    household.to_json
  end 

  patch "/household/:id" do 
    household = Household.find(params[:id])
    household.updates(
      name: params[:name]
    )
    household.to_json
  end 

  delete "/household/:id" do 
    household = Household.find(params[:id])
    household.destroy
    household.to_json
  end 


  # household member routes 
  get "/household_members" do 
    household_members = Household_member.all.order(:created_at)
    household_members.to_json
  end 

  get "/household_members/:id" do 
    household_member = Household_member.find(params[:id])
    household_member.to_json
  end 

  get "/householdMembersByHouseholdId/:householdId" do 
    household_members = Household_member.where(household_id: params[:householdId])
    household_members.to_json
  end 

  get "/householdMembersTotalSalaryByHouseholdId/:householdId" do 
    household_member_incomes = Household_member.where(household_id: params[:householdId]).map {|household_member| household_member.income }
    income_sum = household_member_incomes.sum
    income_sum.to_json
  end 

  post "/household_members" do 
    household_member = Household_member.create(
      household_id: params[:household_id],
      name: params[:name], 
      income: params[:income]
    )
    household_member.to_json
  end 

  patch "/household_members/:id" do 
    household_member = Household_member.find(params[:id])
    household_member.update(
      household_id: params[:household_id],
      name: params[:name], 
      income: params[:income]
    )
    household_member.to_json
  end 

  delete "/household_members/:id" do 
    household_member = Household_member.find(params[:id])
    household_member.destroy
    household_member.to_json
  end 

  # budget routes 
  get "/budgets" do 
    budgets = Budgets.all.order(:created_at)
    budgets.to_json
  end 

  #used
  get "/budgets/:id" do 
    budget = Budget.find(params[:id])
    budget.to_json
  end 

  # used
  get "/budgetsByHouseholdId/:householdId" do 
    budgets = Budget.where(household_id: params[:householdId])
    budgets.to_json
  end 

  # used
   get "/budgetsSumByHouseholdId/:householdId" do 
    budget_amounts = Budget.where(household_id: params[:householdId]).map {|budget| budget.amount}
    budget_sum = budget_amounts.sum
    budget_sum.to_json
  end 

   # used
  post "/budgets" do 
    budget = Budget.create(
      household_id: params[:household_id], 
      amount: params[:amount],
      name: params[:name]
    )
    budget.to_json
  end 

   # used
  patch "/budgets/:id" do 
    budget = Budget.find(params[:id])
    budget.update(
      household_id: params[:household_id], 
      amount: params[:amount],
      name: params[:name])
      budget.to_json
  end 

   # used
  delete "/budgets/:id" do 
    budget = Budget.find(params[:id])
    budget.destroy
    budget.to_json
  end 


  # budget_event routes 
  get "/budget_events" do 
    budget_events = Budget_event.all.order(:created_at)
    budget_events.to_json
  end 

  get "/budget_events/:id" do 
    budget_event = Budget_event.find(params[:id])
    budget_event.to_json
  end 

    # used
  get "/budgetItemsByHouseholdId/:householdId" do 
    budget_ids = Budget.where(household_id: params[:householdId]).map { |budget| budget.id }
    budget_events = Budget_event.where(budget_id: budget_ids)
    budget_events.to_json
  end 

    # used
  get "/budgetItemsTotalPaidToHousehold/:householdId" do 
    budget_ids = Budget.where(household_id: params[:householdId]).map { |budget| budget.id }
    budget_events = Budget_event.where(budget_id: budget_ids )
    budget_events_household = budget_events.where( expense_type: "household").map {|budget| budget.amount}
    household_sum = budget_events_household.sum
    household_sum.to_json
  end 

    # used
  get "/budgetItemsTotalPaidToHouseholdPerMember/:household_member_id" do 
    Budget_event.where(household_member_id: params[:household_member_id]).map {|budget| budget.amount}.sum.to_json
  end 


  post "/budget_events" do 
    budget_event = Budget_event.create(
      household_member_id: params[:household_member_id], 
      budget_id: params[:budget_id], 
      expense_type: params[:expense_type],
      amount: params[:amount],
      purchase_date: params[:purchase_date],
      notes: params[:notes],
      created_at: params[:created_at],
      updated_at: params[:updated_at])
      budget_event.to_json
  end 

  patch "/budget_events/:id" do 
    budget_event = Budget_event.find(params[:id])
    budget_event.update(
      household_member_id: params[:household_member_id], 
      budget_id: params[:budget_id], 
      expense_type: params[:expense_type],
      amount: params[:amount],
      purchase_date: params[:purchase_date],
      notes: params[:notes]
    )
    budget_event.to_json
  end 

  delete "/budget_events/:id" do 
    budget_event = Budget_event.find(params[:id])
    budget_event.destroy
    budget_event.to_json
  end 

end
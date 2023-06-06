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
    name: params[:name])
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

  post "/household_members" do 
    household_member = Household_member.create(
      household_id: params[:household_id],
      name: params[:name], 
      income: params[:income])
    household_member.to_json
  end 

  patch "/household_members/:id" do 
    household_member = Household_member.find(params[:id])
    household_member.updates(
      household_id: params[:household_id],
      name: params[:name], 
      income: params[:income])
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

  get "/budgets/:id" do 
    budget = Budget.find(params[:id])
    budget.to_json
  end 

  post "/budgets" do 
    budget = Budget.create(
      household_id: params[:household_id], 
      amount: params[:amount],
      name: params[:name])
      budget.to_json
  end 

  patch "/budgets/:id" do 
    budget = Budget.find(params[:id])
    budget.updates(
      household_id: params[:household_id], 
      amount: params[:amount],
      name: params[:name])
      budget.to_json
  end 

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

  post "/budget_events" do 
    budget_event = Budget_event.create(
      household_member_id: params[:household_member_id], 
      budget_id: params[:budget_id], 
      expense_type: params[:expense_type],
      purchase_type: params[:purchase_type],
      amount: params[:amount],
      purchase_date: params[:purchase_date],
      notes: params[:notes],
      created_at: params[:created_at],
      updated_at: params[:updated_at])
      budget_event.to_json
  end 

  patch "/budget_events/:id" do 
    budget_event = Budget_event.find(params[:id])
    budget_event.updates(
      expense_type: params[:expense_type],
      purchase_type: params[:purchase_type],
      amount: params[:amount],
      purchase_date: params[:purchase_date],
      notes: params[:notes],
      created_at: params[:created_at],
      updated_at: params[:updated_at])
      budget_event.to_json
  end 

  delete "/budget_events/:id" do 
    budget_event = Budget_event.find(params[:id])
    budget_event.destroy
    budget_event.to_json
  end 

end
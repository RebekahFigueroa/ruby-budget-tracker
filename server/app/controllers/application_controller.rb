class ApplicationController < Sinatra::Base
  set :default_content_type, 'application/json'
  
  # Add your routes here
  get "/" do
    { message: "Good luck with your project!" }.to_json
  end

  # household member routes 
  get "/household_members" do 
    household_members = Household_member.all.order(:created_at)
    household_members.to_json
  end 

  post "/household_members" do 
    household_member = Household_member.create(
      name: params[:name], 
      income: params[:income])
    household_member.to_json
  end 

  patch "/household_members/:id" do 
    household_member = Household_member.find(params[:id])
    household_member.updates(
      name: params[:name], 
      income: params[:income])
    household_member.to_json
  end 

  delete "/household_members/:id" do 
    household_member = Household_member.find(params[:id])
    household_member.destroy
    household_member.to_json
  end 

  # budget_event routes 
  get "/budget_events" do 
    budget_events = Budget_event.all.order(:created_at)
    budget_events.to_json
  end 

  post "/budget_events" do 
    budget_event = Budget_event.create(
      household_member_id: params[:household_member_id], 
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

  dlete "/budget_events/:id" do 
    budget_event = Budget_event.find(params[:id])
    budget_event.destroy
    budget_event.to_json
  end 

end
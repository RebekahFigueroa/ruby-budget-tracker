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

  post "/household_members/:id" do 
    household_member = Household_member.find(params[:id])
    household_member.destroy
    household_member.to_json
  end 

end

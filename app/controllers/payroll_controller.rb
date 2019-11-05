require 'csv'
class PayrollController < ApplicationController
  def index
    render json: Employee.all
  end
  def show
   
  end
  def home
    
  end
  def create
    Employee.destroy_all
    Timespan.destroy_all
    last_index = params["reportID"].to_i
    puts last_index
    CSV.foreach(params["file"].tempfile,headers: true) do |row|
      if !Employee.exists?(row[2]) && row[0] != "report id"
      employees =  Employee.create(id: row[2], job_group: row[3])
      end
      @employee = Employee.find(row[2])
      @timespan = @employee.timespans.create(date: row[0], hours_worked: row[1], employee_id: row[2], report_id: last_index )
    end
    render json: Timespan.all
    # employee = Employee.create(employee_params)
    # render json: employee
  end
  private
  # def employee_params
  #   params.require(:employee).permit(:id, :job_group)
  # end
end

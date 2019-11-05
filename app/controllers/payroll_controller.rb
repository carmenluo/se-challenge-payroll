require 'csv'
require 'date'
require 'active_support/all'
class PayrollController < ApplicationController
  def index
    render json: Employee.all
  end
  def show
   
  end
  def home
    
  end
  def create
    Timespan.destroy_all
    Report.destroy_all
    Employee.destroy_all
    last_index = params["reportID"].to_i
    employees_list = []
    puts last_index
    CSV.foreach(params["file"].tempfile,headers: true) do |row|
      # parse CSV file except for the last row
      if row[0] != "report id"
        if !Employee.exists?(row[2])
        employees =  Employee.create(id: row[2], job_group: row[3])
        employees_list.push(row[2])
        end
        @employee = Employee.find(row[2])
        @timespan = @employee.timespans.create(date: row[0], hours_worked: row[1], report_id: last_index )
      end
    end
    generate_report(last_index, employees_list)
    render json: Timespan.all
    # employee = Employee.create(employee_params)
    # render json: employee
  end

  def generate_report(report_id, employees_list)
    
    @records = Timespan.where(report_id: report_id)
    employees_list.each do |employee|
      @employee = Employee.find(employee)
      @timespan = @employee.timespans.where(report_id: report_id)
      @timespan.each do |timespan|
        amount_paid = 0
      case @employee.job_group
        time_period = [[]]
        current_day = timespan.date.day
      when "A"
        case current_day
        when 1..15
          amount_paid += timespan.hours_worked * 30

          time_period.push([current_day.beginning_of_month, amount_paid])
        when 16..31
          amount_paid += timespan.hours_worked * 30
        end
      when "B"
        case timespan.date.day
        when 1..15
          amount_paid += timespan.hours_worked * 20
        when 16..31
          amount_paid += timespan.hours_worked * 20
        end
      end
      @report = @employee.reports.create(amount_paid: amount_paid, report_id: report_id )
      amount_paid=0
      end
    end
  end
  private
  # def employee_params
  #   params.require(:employee).permit(:id, :job_group)
  # end
end

require 'csv'
require 'date'
require 'active_support/all'
class PayrollController < ApplicationController
  def index
    # Report.destroy_all
    # Timespan.destroy_all
    # Employee.destroy_all
    render json: Employee.all
  end
  def show
   
  end
  def home
    
  end
  def create
    last_index = params["reportID"].to_i
    employees_list = []
    CSV.foreach(params["file"].tempfile,headers: true, skip_blanks: true) do |row|
      # parse CSV file except for the last row
      if row[0] != "report id"
        # check if this employee id exists or not
        if !Employee.exists?(row[2])
        employees =  Employee.create(id: row[2], job_group: row[3])
        employees_list.push(row[2])
        end
        @employee = Employee.find(row[2])
        # store raw data into database with date, hours_worked, report_id and associate with Employee model
        @timespan = @employee.timespans.create(date: row[0], hours_worked: row[1], report_id: last_index )
        add_report_item(@employee, @timespan)
      end
    end
    render json: Report.where(report_id: last_index)
  end

  def add_report_item(employee, timespan)
    amount_paid = 0
    case employee.job_group
    when "A"
      amount_paid += timespan.hours_worked * 30
    when "B"
      amount_paid += timespan.hours_worked * 20
    end
    current_date = timespan.date
    case current_date.day
    when 1..15
      pay_start_date = current_date.beginning_of_month
      pay_end_date = Date.new(current_date.year, current_date.month, 15)
    when 16..31
      pay_start_date = Date.new(current_date.year, current_date.month, 16)
      pay_end_date = current_date.end_of_month 
    end

    report = Report.where(employee_id: employee.id, pay_start_date:  pay_start_date, pay_end_date: pay_end_date,report_id: timespan.report_id ).first_or_create
    report.amount_paid ||= 0
    report.amount_paid += amount_paid
    report.save!
  end
end
  # def employee_params
  #   params.require(:employee).permit(:id, :job_group)



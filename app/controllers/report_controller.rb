class ReportController < ApplicationController
  def index
    render json: Report.order('report_id DESC, employee_id, pay_start_date').all
  end
  def show
    report_items = Report.where(report_id: params[:id]).order('report_id DESC, employee_id, pay_start_date')
    render json: report_items
  end
  # def all_reports_id
  #   reports_id =  Report.select(:report_id).distinct
  #   render json: reports_id
  # end
  def ids
    reports_id =  Report.select(:report_id).distinct
    render json: reports_id
  end
end

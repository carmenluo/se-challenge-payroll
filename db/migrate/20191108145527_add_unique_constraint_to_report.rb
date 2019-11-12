class AddUniqueConstraintToReport < ActiveRecord::Migration[5.2]
  def change
    add_index :reports, [:pay_start_date, :pay_end_date, :amount_paid, :report_id], 
    :unique => true,
    :name => "report_unique_index"
  end
end

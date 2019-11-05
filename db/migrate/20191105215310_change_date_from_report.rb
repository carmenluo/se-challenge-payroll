class ChangeDateFromReport < ActiveRecord::Migration[5.2]
  def change
    remove_column :reports, :pay_period
    add_column :reports, :pay_start_date, :date
    add_column :reports, :pay_end_date, :date
  end
end

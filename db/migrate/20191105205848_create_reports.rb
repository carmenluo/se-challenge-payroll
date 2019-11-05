class CreateReports < ActiveRecord::Migration[5.2]
  def change
    create_table :reports do |t|
      t.string :pay_period
      t.decimal :amount_paid
      t.integer :report_id
      t.references :employee, foreign_key: true

      t.timestamps
    end
  end
end

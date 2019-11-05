class CreateTimespans < ActiveRecord::Migration[5.2]
  def change
    create_table :timespans do |t|
      t.date :date
      t.decimal :hours_worked
      t.integer :report_id
      t.references :employee, foreign_key: true

      t.timestamps
    end
  end
end

class DropTImespans < ActiveRecord::Migration[5.2]
  def change
    drop_table :timespans
  end
end

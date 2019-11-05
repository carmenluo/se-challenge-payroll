class Employee < ApplicationRecord
  has_many :timespans
  has_many :reports
end

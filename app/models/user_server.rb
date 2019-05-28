class UserServer < ApplicationRecord
  validates :user_id, :server_id, presence: true
  validates_uniqueness_of :user_id, :scope => [:server_id]
  
  belongs_to :user
  belongs_to :server
end
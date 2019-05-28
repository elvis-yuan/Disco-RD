class Channel < ApplicationRecord
  validates :title, presence: true

  belongs_to :server
  has_many :messages
end
class Message < ApplicationRecord
  validates :body, presence: true

  belongs_to :user
  belongs_to :channel
end
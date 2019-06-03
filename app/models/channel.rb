class Channel < ApplicationRecord
  validates :title, presence: true

  belongs_to :server
  has_many :messages

  has_many :users,
    through: :messages,
    source: :user

end
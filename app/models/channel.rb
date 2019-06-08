class Channel < ApplicationRecord
  validates :title, presence: true

  belongs_to :server
  has_many :messages

  has_many :users,
    through: :messages,
    source: :user

  belongs_to :dm_server,
    foreign_key: :dm_id,
    class: "Server",
    optional: true

end
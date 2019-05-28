class Server < ApplicationRecord
  validates :title, :invitation_code, presence: true
  validates :public, inclusion: { in: [true, false] }

  belongs_to :admin,
    foreign_key: :admin_id,
    class_name: "User"

  has_many :user_servers

  has_many :users, 
    through: :user_servers,
    source: :user

  has_many :channels

  has_many :messages,
    through: :channels,
    source: :messages
end
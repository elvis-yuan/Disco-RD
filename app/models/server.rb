class Server < ApplicationRecord
  validates :title, :invitation_code, presence: true
  validates :public, inclusion: { in: [true, false] }

  belongs_to :admin,
    foreign_key: :admin_id,
    class_name: "User"

  has_many :user_servers

  has_many :connected_users, 
    through: :user_servers,
    source: :user

  has_many :channels

  has_many :messages,
    through: :channels,
    source: :messages

  has_many :dms,
    foreign_key: :dm_id,
    class_name: "Channel"

end
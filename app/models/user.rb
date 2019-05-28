class User < ApplicationRecord
  validates :username, :email, :password_digest, :session_token, presence:true, uniqueness: true
  validates :password, length: {minimum: 6}, allow_nil: true
  after_initialize :ensure_session_token
  attr_reader :password

  has_many :created_servers,
    foreign_key: :admin_id,
    class_name: "Server"

  has_many :user_servers

  has_many :servers,
    through: :user_servers,
    source: :server

  has_many :messages

  has_many :alias,
    foreign_key: :user_id,
    class_name: "UserServer"

  def self.find_by_credentials(username, password)
    user = User.find_by(username: username)
    return nil unless user && user.is_password?(password)
    user
  end

  def is_password?(password)
    bcrypt_password = BCrypt::Password.new(self.password_digest)
    bcrypt_password.is_password?(password)
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def reset_session_token
    self.update(session_token: self.class.generate_session_token)
    self.session_token
  end


  private
  def self.generate_session_token
    SecureRandom.urlsafe_base64
  end

  def ensure_session_token
    self.session_token ||= self.class.generate_session_token
  end
end
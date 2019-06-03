module ApplicationCable
  class Channel < ActionCable::Channel::Base
    # helper_method :current_user, :logged_in?

    # def current_user
    #     @current_user ||= User.find_by(session_token: session[:session_token])
    # end
  end
end

## README

## DISCO-RD
[Live Site](https://disco-rd.herokuapp.com/)

## OVERVIEW
Disco-rd is a fullstack app which is a pixel perfect clone of [Discord](https://discordapp.com/). Disco-rd is a chat application where users can invite friends to their servers and create a community through the use of text channels.

## TECHNOLOGIES
* PostgreSQL database
* Jbuilder
* Webpack
* Ruby on Rails backend framework
* Ruby on Rails Action Cables - websockets for chat and notifications
* jQuery - Ajax requests
* React.js with Redux.js

## FEATURES
* User authentication
* Custom errors
* Servers and channels CRUD
* Tracking of all users connected to a server
* Live chat in channels

## COOL BITS OF CODE
A cool bit of code that handles when a new user joins a server, adding them to all currently online user's  Server User list.

```js 
class ServerChannel < ApplicationCable::Channel
  def subscribed
    user = User.find(params[:user_id])
    newUser = {id: user.id, username: user.username, email: user.email}
    socket = { type: "user", user: newUser, server_id: params[:server_id] }

    ServerChannel.broadcast_to(params[:server_id], socket)

    stream_for params[:server_id]
  end
 ```
Before the user creates a websocket connection to the ServerChannel, they make broadcast to all currently online users to update their state to include the new user. This forces everyone to rerender their user list to include the new user. 
-Credit to Adam Liang for the idea

## COMING SOON!
* Direct messaging
* Voice over IP
* User presence tracker
* User aliasing
* AWS for image uplading for icons

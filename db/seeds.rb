# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


users = [
  {
    'username' => 'DemoUser',
    'password' => 'Password',
    'email' => 'email@email.com'
  },
  {
    'username' => 'Elvis',
    'password' => 'Password',
    'email' => 'email1@email.com'
  },
  {
    'username' => 'John',
    'password' => 'Password',
    'email' => 'email2@email.com'
  },
  {
    'username' => 'Phil',
    'password' => 'Password',
    'email' => 'email3@email.com'
  },
  {
    'username' => 'Paul',
    'password' => 'Password',
    'email' => 'email4@email.com'
  },
]

servers = [
  {
    title: "TestServer1",
    invitation_code: "ABCDEFG",
    admin_id: 1
  },
  {
    title: "TestServer2",
    invitation_code: "123456",
    admin_id: 2
  },
  {
    title: "TestServer3",
    invitation_code: "qwerty",
    admin_id: 3
  },
  {
    title: "TestServer4",
    invitation_code: "testing",
    admin_id: 1
  }
]

User.create!(users)
Server.create(servers)


User.all.each do |user|
  Server.all. each do |server|
    UserServer.create({user_id: user.id, server_id: server.id})
  end
end

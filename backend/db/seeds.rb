# frozen_string_literal: true

# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
u = User.create(email: 'test@example.com', password: 'password', confirmed_at: Time.now)

u.items.create(title: "Lanky doggo", url: "https://exceptionalanimals.files.wordpress.com/2011/03/langy_lycaon.jpg", tag_list: "doggo, lanky").save
u.items.create(title: "Browno Doggo", url: "https://i.redd.it/p58vnipwhk7z.jpg", tag_list: "doggo, cholocoto").save
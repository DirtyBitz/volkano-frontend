[![pipeline status](https://inf2900v18.cs.uit.no/team4/volkano/badges/development/pipeline.svg)](https://inf2900v18.cs.uit.no/team4/volkano/commits/development)

# Recommended VSCode plugins

## Prettier

* Auto style formatting for javascript and json

## ruby-rubocop

* Lints and autocorrects ruby code

## Ruby Solargraph

* Intellisense for ruby
* NB! First you must do `gem install solargraph`

# Initializing the git hooks

1. Run the `init_hooks` script found in the project root directory

# Setting up the database

1. [Install docker](https://docs.docker.com/engine/installation/)
2. Start the database and run it in the background `docker-compose up -d`

# The frontend

1. [Install yarn](https://yarnpkg.com/lang/en/docs/install/)
2. Run `yarn install` in the `frontend` directory
3. Run `yarn dev` in the `frontend` directory to start the development server

# The backend

1. [Install rvm](https://rvm.io/)
2. Run `rvm install "ruby-2.5.0"`
3. Run `bundle install` in the `backend` directory
4. Run `rails db:create db:migrate` to create the database and set up tables
5. Run `rails s` to start the development server

## Using [mailcatcher](https://mailcatcher.me/) to catch emails in development

The mailcatcher gem tends to conflict with gems that are common in Rails projects so we do not include it in the Gemfile. Instead, simply run `gem install mailcatcher` to install it along your system gems and start it with the `mailcatcher` command. It will run in the background and catch any mail that the backend sends to `smpt://localhost:1025`. You can view these emails at `http://localhost:1080/`.

## "Oh shit!" commands

* To nuke all docker containers: `docker rmi $(docker images -q) --force`
* To nuke the database: `rails db:drop`

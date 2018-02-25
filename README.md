[![pipeline status](https://inf2900v18.cs.uit.no/team4/volkano/badges/development/pipeline.svg)](https://inf2900v18.cs.uit.no/team4/volkano/commits/development)
[![backend test coverage](https://inf2900v18.cs.uit.no/team4/volkano/badges/development/coverage.svg)](https://inf2900v18.cs.uit.no/team4/volkano/commits/development)

# Recommended VSCode plugins

## Prettier

* Auto style formatting for javascript and json

## ruby-rubocop

* Lints and autocorrects ruby code

## Ruby Solargraph

* Intellisense for ruby
* NB! First you must do `gem install solargraph`

# Setting up the external services

1. [Install docker](https://docs.docker.com/engine/installation/)
2. Run all external services in the background with `docker-compose up -d`

Emails can be sent to `smtp://localhost:1025` and read at [`http://localhost:1080`](http://localhost:1080). You can examine the database with `psql -h 0.0.0.0 -U postgres` or by running `rails dbconsole` from the backend directory.

# The frontend

1. [Install yarn](https://yarnpkg.com/lang/en/docs/install/)
2. Run `yarn install` in the `frontend` directory
3. Run `yarn dev` in the `frontend` directory to start the development server

# The backend

1. [Install rvm](https://rvm.io/)
2. Run `rvm install "ruby-2.5.0"`
3. Run `bundle install` in the `backend` directory
4. Run `rails db:setup` to create the database and set up tables
5. Run `rails s` to start the development server

## Initialize git hooks

* Run `./init_hooks` in the root folder to set up pre-commit and commit-message hooks

## "Oh shit!" commands

* To nuke all docker containers: `docker rmi $(docker images -q) --force`
* To nuke the database: `rails db:drop`

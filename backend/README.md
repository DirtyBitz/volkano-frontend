[![pipeline status](https://inf2900v18.cs.uit.no/team4/volkano/badges/development/pipeline.svg)](https://inf2900v18.cs.uit.no/team4/volkano/commits/development)
[![total test coverage](https://inf2900v18.cs.uit.no/team4/volkano/badges/development/coverage.svg)](https://inf2900v18.cs.uit.no/team4/volkano/commits/development)

# Setup

## External services

1.  [Install docker](https://docs.docker.com/engine/installation/)
2.  Run all external services in the background with `docker-compose up -d`

## The frontend

All of these commands are run in the `frontend` directory

1.  [Install yarn](https://yarnpkg.com/lang/en/docs/install/)
2.  Run `yarn install` to install all packages
3.  Run `yarn dev` to start the development server

## The backend

All of these commands are run in the `backend` directory

1.  [Install rvm](https://rvm.io/) to manage your Ruby binaries
2.  Run `rvm install "ruby-2.5.0"` to get the newest version of Ruby
3.  Run `bundle install` to install all gems
4.  Run `rails db:setup db:seed` to create the database and set up tables with seed data
5.  Run `rails s` to start the development server

# Usage

All `yarn` commands must be run from the `frontend` directory and all `rails` commands must be run in the `backend` directory.

You can examine the database with `psql -h 0.0.0.0 -U postgres` or by running `rails dbconsole`. Emails can be sent to `smtp://localhost:1025` and read at [`http://localhost:1080`](http://localhost:1080).

## Tests

## Running in production mode

* Set the following environment variables:

  |              Name | Explanation                                      |
  | ----------------: | :----------------------------------------------- |
  |              PORT | The port frontend listens on                     |
  |      DATABASE_URL | URL for the backend database server              |
  | SENDGRID_USERNAME | Username for SMTP server                         |
  | SENDGRID_PASSWORD | Password for SMTP server                         |
  | FRONTEND_HOSTNAME | The host where the backend can find the frontend |
  |  BACKEND_HOSTNAME | The host where the frontend can find the backend |
  |        SENTRY_DSN | (_optional_) DSN for Sentry integration          |

* Run `yarn start` to build all pages and start the production server
* Run `rails s -e production` to start the rails server in production mode
* Visit [`http://localhost:3000/`](http://localhost:3000/) in your browser (if you set PORT to 3000)

### Continuous

* The frontend tests can be run in watch mode with `yarn test`
* The backend tests can be run in watch mode with the `guard` command in the `backend` directory
* The acceptance tests can be run in watch mode with the `yarn cypen`

### One time

* The frontend tests can be run with `yarn quicktest` or `yarn ci` to generate coverage
* The backend tests can be run with `rspec`
* The acceptance tests can be run with `yarn cyprun`

# Development

## Initialize git hooks

* Run `./init_hooks` in the root folder to set up pre-commit and commit-message hooks

## Recommended VSCode plugins

### Prettier

* Automatic code formatting for JavaScript and JSON

### ruby-rubocop

* Lints and autocorrects ruby code

### Ruby Solargraph

* IntelliSense for ruby
* NB! First you must do `gem install solargraph`

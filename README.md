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

## "Oh shit!" commands

* To nuke all docker containers: `docker rmi $(docker images -q) --force`
* To nuke the database: `rails db:drop`

# Development guide

_Info: Master and development branches are protected, so you can't push directly to them_  
Read [this](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow) guide for more information on how the dev workflow works.

## Branch naming conventions

* Features `feature/great-branch-name`
* Bug fixes `bugfix/great-branch-name`
* Changes on documentation `doc/great-branch-name`
* Tooling changes `tooling/great-branch-name`

## Example of developing a new feature

To create a new feature you must fork from `development` and create your own branch.  
Change to the `development` branch and create a new feature branch, give it a descriptive name.

```shell
git checkout development
git checkout -b feature/great-branch-name
```

Do your work and create a nice commit message.

```shell
git add .
git commit -m "Nice commit message"
```

When all your work is commited you can use `git rebase development -i`.  
This allows you to combine your commits if you wish, and renaming them if you have given them a bad name.  
You should now be ready to push your changes to GitLab.

```shell
git push -u origin feature/great-branch-name
```

You should now be able to create a merge request in GitLab.  
Make sure you ask for a merge request into `development` and not into `master`.

Once the feature has been merged into development you can delete your feature branch localy.

```shell
git branch -D feature/great-branch-name
```

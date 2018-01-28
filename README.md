# Recommended VSCode plugins

* Prettier (Auto style formatting)
* ruby-rubocop (Lints and autocorrects)

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

# Dirty Bits Repo

# Development guide

_Info: Master and development branches are protected, so you can't push directly to them_  
Read [this](https://www.atlassian.com/git/tutorials/comparing-workflows/feature-branch-workflow) guide for more information on how the dev workflow works.

## Creating a new feature

To create a new feature create a branch of `development` and create your feature.  
Change to the `development` branch and create a new feature branch, give it a descriptive name.

```shell
git checkout development
git checkout -b feature/[name]
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
git push -u origin new-feature
```

You should now be able to create a merge request in GitLab.  
Make sure you ask for a merge request into `development` and not into `master`.

## Fixing a bug

Same as feature, but name the branch as `git checkout -b bugfix/[name/bug-number]`

# frozen_string_literal: true

class FixturesController < ApplicationController
  skip_before_action :authenticate_user!

  def create
    if (user = UserFactory.create_test_user(fixture_params))
      render json: user, status: :created
    else
      render json: { error: 'Email must be in the example.com domain' },
             status: :bad_request
    end
  end

  def fixture_params
    params.require(:email)
  end
end

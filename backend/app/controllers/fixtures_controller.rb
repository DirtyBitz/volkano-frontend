# frozen_string_literal: true

class FixturesController < ApplicationController
  skip_before_action :authenticate_user!

  def create
    render json: UserFactory.create_test_user,
           status: :created
  end
end

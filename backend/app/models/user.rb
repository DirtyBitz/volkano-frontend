# frozen_string_literal: true

class User < ApplicationRecord
  # This concern includes the Devise modules
  # :database_authenticatable, :registerable,
  # :recoverable, :trackable, :validatable and :confirmable
  include DeviseTokenAuth::Concerns::User

  has_many :items, dependent: :destroy
  validates :nickname, uniqueness: true
end

# frozen_string_literal: true

class User < ApplicationRecord
  # This concern includes the Devise modules
  # :database_authenticatable, :registerable,
  # :recoverable, :trackable, :validatable and :confirmable
  include DeviseTokenAuth::Concerns::User

  has_many :items,
           -> { includes(:tags, :categories) },
           inverse_of: :user,
           dependent: :destroy

  validates :email, uniqueness: { case_insensitive: true }
  validates :nickname, uniqueness: true,
                       allow_blank: true,
                       format: { without: /@/ }
end

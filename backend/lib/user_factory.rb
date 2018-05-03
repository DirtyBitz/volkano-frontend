# frozen_string_literal: true

class UserFactory
  def self.create_test_user(email)
    return unless email.end_with? 'example.com'

    User.find_by(email: email).try(:destroy)
    User.create!(
      email: email,
      password: 'password',
      confirmed_at: Time.now.utc
    )
  end
end

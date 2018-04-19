# frozen_string_literal: true

class UserFactory
  def self.create_test_user
    User.find_by(email: 'test@example.com').try(:destroy)
    u = User.create(
      email: 'test@example.com',
      password: 'password',
      confirmed_at: Time.now.utc
    )
    u.reload
    u.tokens = nil
    u.save!
    u
  end
end

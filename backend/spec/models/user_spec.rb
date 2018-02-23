# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  it 'should have a valid factory' do
    valid_item = build(:user)
    expect(valid_item).to be_valid
  end

  it 'should not be valid without an email' do
    invalid_user = build(:user, email: '')
    expect(invalid_user).not_to be_valid
  end

  it 'should not be valid without a password' do
    invalid_user = build(:user, password: '')
    expect(invalid_user).not_to be_valid
  end

  it 'should have unique email' do
    existing_user = create(:user)
    duplicate_user = build(:user,
                           email: existing_user.email)
    expect(duplicate_user).not_to be_valid
  end

  it 'should have unique nickname' do
    existing_user = create(:user)
    duplicate_user = build(:user,
                           nickname: existing_user.nickname)
    expect(duplicate_user).not_to be_valid
  end
end

# frozen_string_literal: true

require 'rails_helper'
require 'webmock/rspec'

RSpec.describe Item, type: :model do
  before(:each) do
    allow_any_instance_of(WebCollector).to receive(:valid?)
      .and_return(true)
    allow_any_instance_of(WebCollector).to receive(:collect)
      .and_return(
        mediatype: 'image', size: 1337, categories: 'waddup'
      )
  end

  it 'should have a valid factory' do
    valid_item = build(:item)
    expect(valid_item).to be_valid
  end

  it 'should not be valid without a title' do
    invalid_item = build(:item, title: '')
    expect(invalid_item).not_to be_valid
  end

  it 'should have unique url/user combination' do
    existing_item = create(:item)
    duplicate_item = build(:item,
                           url: existing_item.url,
                           user: existing_item.user)
    expect(duplicate_item).not_to be_valid
  end

  it 'should allow two different users to collect same url' do
    shared_url = 'http://example.com/image.jpg'
    first_user = create(:user)
    second_user = create(:user)
    create(:item, user: first_user, url: shared_url)
    second_item = build(:item, user: second_user, url: shared_url)
    expect(second_item).to be_valid
  end

  it 'should not be valid without a user' do
    unowned_item = build(:item, user: nil)
    expect(unowned_item).not_to be_valid
  end

  it 'should be taggable' do
    kitty_image = create(:item, tag_list: 'cute, cat, image')
    expect(kitty_image.tag_list).to contain_exactly('cute', 'cat', 'image')
  end

  it 'should not be valid unless URL is resolvable' do
    allow_any_instance_of(WebCollector).to receive(:valid?)
      .and_return(false)

    bad_item = build(:item)
    expect(bad_item).not_to be_valid
    expect(bad_item.errors[:url]).to include(/invalid url/i)
  end
end

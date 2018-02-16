require 'rails_helper'

RSpec.describe Item, type: :model do
  let(:valid_params) {{ title: 'Valid item', url: 'http://example.com/image.jpg', tag: 'exampletag' }}

  it 'should be valid' do
    valid_item = Item.new(valid_params)
    expect(valid_item).to be_valid
  end

  it 'should not be valid with short title' do
    unvalid_item = Item.new(title: '')
    expect(unvalid_item).not_to be_valid
  end
  
end

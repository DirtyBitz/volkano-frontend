# frozen_string_literal: true

require_relative '../../app/lib/collector'
require 'spec_helper'

RSpec.describe Collector do
  describe 'given valid url' do
    it 'should collect an image' do
      item = Collector.new('https://example.com/img.jpg').collect
      expect(item).to include(
        categories: ['example.com', 'jpg', 'image/jpeg']
      )
    end
  end
end

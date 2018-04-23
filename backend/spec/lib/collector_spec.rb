# frozen_string_literal: true

require_relative '../../app/lib/collector'
require 'spec_helper'

RSpec.describe Collector do
  describe 'given valid url' do
    it 'should collect an image' do
      item = Collector.new('https://example.com/img.jpg').collect

      expect(item).to include(
        categories: include('example.com', 'jpg', 'image'),
        type: 'image'
      )
    end

    it 'should collect a video' do
      item = Collector.new('https://example.com/vid.mp4').collect

      expect(item).to include(
        categories: include('example.com', 'mp4', 'video'),
        type: 'video'
      )
    end

    it 'should collect a youtube-video' do
      item = Collector.new(
        'https://www.youtube.com/watch?v=D-UmfqFjpl0'
      ).collect

      expect(item).to include(
        categories: include('youtube.com', 'youtube'),
        type: 'youtube'
      )
    end

    it 'should collect a shortened youtube-link' do
      item = Collector.new(
        'https://youtu.be/D-UmfqFjpl0'
      ).collect

      expect(item).to include(
        categories: ['youtu.be', 'youtube'],
        type: 'youtube'
      )
    end
  end
end

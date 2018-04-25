# frozen_string_literal: true

require_relative '../../app/lib/collector'
require 'spec_helper'
require 'webmock/rspec'

RSpec.describe Collector do
  describe 'given valid url' do
    it 'should collect an image' do
      item = Collector.new('https://example.com/img.jpg').collect

      expect(item).to include(
        categories: include('example.com', 'jpg', 'image'),
        mediatype: 'image'
      )
    end

    it 'should collect a video' do
      item = Collector.new('https://example.com/vid.mp4').collect

      expect(item).to include(
        categories: include('example.com', 'mp4', 'video'),
        mediatype: 'video'
      )
    end

    it 'should collect a youtube-video' do
      item = Collector.new(
        'https://www.youtube.com/watch?v=D-UmfqFjpl0'
      ).collect

      expect(item).to include(
        categories: include('youtube.com', 'youtube'),
        mediatype: 'youtube'
      )
    end

    it 'should collect a shortened youtube-link' do
      item = Collector.new(
        'https://youtu.be/D-UmfqFjpl0'
      ).collect

      expect(item).to include(
        categories: include('youtu.be', 'youtube'),
        mediatype: 'youtube'
      )
    end

    it 'should not collect hostname of ip address' do
      item = Collector.new(
        'https://10.0.0.1/image.jpg'
      ).collect

      expect(item).to include(
        categories: %w[jpg image],
        mediatype: 'image'
      )
    end

    it "should confirm it's valid" do
      uri = 'https://example.com/cute_kitten.jpg'
      stub_request(:get, uri)
        .to_return(status: 200)

      item = Collector.new(uri)

      expect(item).to be_valid
      expect(WebMock).to have_requested(:get, uri).once
    end
  end

  describe 'given invalid url' do
    it "should confirm it's invalid" do
      uri = 'https://example.com/cute_kitten.jpg'
      stub_request(:get, uri)
        .to_return(status: 404)

      item = Collector.new(uri)

      expect(item).to_not be_valid
      expect(WebMock).to have_requested(:get, uri).once
    end
  end
end

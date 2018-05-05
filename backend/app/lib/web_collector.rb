# frozen_string_literal: true

require 'net/http'

class WebCollector
  def initialize(url)
    @url = url
  end

  def request_metadata
    url = URI(@url)
    http = Net::HTTP.new(url.host, url.port)

    http.use_ssl = true if url.scheme&.match?(/https/)

    begin
      request_url = url.path || '/'
      request_url += '?' + url.query unless url.query.nil?
      head = http.request_head(request_url)
    rescue SocketError
      return Net::HTTPError
    end
    head
  end

  def response
    @response ||= request_metadata
  end

  def collect
    { mediatype: type, categories: categories, size: size }
  end

  def categories
    [host, filetype, type].uniq.compact
  end

  def filetype
    if @url.match?(%r{\A(https?\://)?(www\.)?(youtube\.com|youtu\.?be)/.+\z})
      return 'youtube'
    end

    File.extname(@url).tr('.', '').sub(/\?.+/, '')
  end

  def type
    case filetype
    when /youtube/
      'youtube'
    when /jpe?g|gif|png|svg/
      'image'
    when /mp4|mov|avi|mkv|webm/
      'video'
    when /mp3|ogg|wav|flac|aac|wma/
      'audio'
    else
      raise InvalidType
    end
  end

  def size
    response&.content_length
  end

  def host
    host = URI(@url).host
    domain = PublicSuffix.parse(host).domain.downcase
    domain.match?(/\d+\.\d+/) ? nil : domain
  end

  def valid?
    return false unless @url.match?(URI::DEFAULT_PARSER.make_regexp)

    response.is_a? Net::HTTPSuccess
  end

  class InvalidType < StandardError
  end
end

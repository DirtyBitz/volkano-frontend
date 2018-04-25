# frozen_string_literal: true

class Collector
  def initialize(url)
    @url = url
  end

  def collect
    { type: type, categories: categories }
  end

  def categories
    [host_without_www, filetype, type].uniq
  end

  def filetype
    if @url.match?(%r{\A(https?\://)?(www\.)?(youtube\.com|youtu\.?be)/.+\z})
      return 'youtube'
    end

    File.extname(@url).tr('.', '')
  end

  def type
    case filetype
    when /youtube/
      'youtube'
    when /jpe?g|gif|png|svg/
      'image'
    when /mp4|mov|avi|mkv/
      'video'
    when /mp3|ogg|wav|flac|aac|wma/
      'audio'
    else
      raise InvalidType
    end
  end

  def size
    url = URI(@url)
    http = Net::HTTP.new(url.host, url.port)

    http.use_ssl = true if url.scheme.match?(/https/)

    head = http.request_head(url.path.empty? ? '/' : url.path)
    head.content_length
  end

  def host
    host = URI(@url).host
    domain = PublicSuffix.parse(host).domain.downcase
    domain.match?(/\d+\.\d+/) ? nil : domain
  end

  def valid?
    response = Net::HTTP.get_response(URI(@url))
    response.is_a? Net::HTTPSuccess
  end

  class InvalidType < StandardError
  end
end

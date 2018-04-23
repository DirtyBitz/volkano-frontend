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

  def host_without_www
    uri = URI.parse(@url)
    uri = URI.parse("http://#{@url}") if uri.scheme.nil?
    host = uri.host.downcase
    host.start_with?('www.') ? host[4..-1] : host
  end

  class InvalidType < StandardError
  end
end

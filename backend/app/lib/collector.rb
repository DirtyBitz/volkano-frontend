# frozen_string_literal: true

require 'mime/types'

class Collector
  def initialize(url)
    @url = url
  end

  def collect
    host = host_without_www
    filetype = File.extname(@url).tr('.', '')
    mimetype = MIME::Types.type_for(filetype).first

    { categories: [host, filetype, mimetype] }
  end

  def host_without_www
    uri = URI.parse(@url)
    uri = URI.parse("http://#{@url}") if uri.scheme.nil?
    host = uri.host.downcase
    host.start_with?('www.') ? host[4..-1] : host
  end
end

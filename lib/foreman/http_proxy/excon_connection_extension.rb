Excon::Connection.class_eval do
  include Foreman::HTTPProxy
  alias_method :orig_request, :request

  def request(params, &block)
    if proxy_http_request?(@data[:proxy], @data[:host], @data[:schema])
      log_proxied_request(http_proxy, @data[:host])
      @data[:proxy] = http_proxy
      setup_proxy
    end
    orig_request(params, &block)
  end
end

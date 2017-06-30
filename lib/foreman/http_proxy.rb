module Foreman
  module HTTPProxy
    def logger
      Foreman::Logging.logger('app')
    end

    def log_proxied_request(current_proxy, requested_host)
      logger.info "Proxying request to #{requested_host} via #{current_proxy}"
    end

    def http_proxy
      Setting::General.find_by_name('http_proxy').value
    end

    def http_proxy_except_list
      Setting::General.find_by_name('http_proxy_except_list').value
    end

    def http_host_excepted?(host)
      !http_proxy_except_list.include? host
    end

    def proxy_http_request?(current_proxy, request_host, schema)
      !http_proxy.nil? &&
      current_proxy.nil? &&
      !request_host.nil? &&
      http_host_excepted?(request_host) &&
      schema != 'unix'
    end
  end
end

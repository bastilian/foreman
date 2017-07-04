module Foreman
  module HTTPProxy
    def http_proxy
      Setting::General.find_by_name('http_proxy').value
    end

    def http_proxy_except_list
      Setting::General.find_by_name('http_proxy_except_list').value
    end

    def proxy_http_request?(current_proxy, request_host, schema)
      !http_proxy.nil? && current_proxy.nil? && !request_host.nil? &&
      schema != 'unix' &&
      !http_host_excepted?(request_host) &&
      !http_host_excepted_by_wildcard?(request_host)
    end

    private

    def logger
      Foreman::Logging.logger('app')
    end

    def log_proxied_request(current_proxy, requested_host)
      logger.info "Proxying request to #{requested_host} via #{current_proxy}"
    end

    def http_host_excepted_by_wildcard?(host)
      http_proxy_except_list.collect do |value|
        return unless value.include? '*'
        host.match(/#{value.gsub('*', '')}/)
      end.any?
    end

    def http_host_excepted?(host)
      http_proxy_except_list.include? host
    end
  end
end

require_dependency File.expand_path('../http_proxy/excon_connection_extension', __FILE__)
require_dependency File.expand_path('../http_proxy/net_http_extension', __FILE__)

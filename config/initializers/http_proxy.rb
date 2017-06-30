if Setting::General.find_by_name('http_proxy')
  require 'foreman/http_proxy/excon_connection_extension'
  require 'foreman/http_proxy/net_http_extension'
end

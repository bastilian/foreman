module Foreman
  class PuppetReportScanner
    class << self
      def scan(report)
        report.origin = 'Puppet' if puppet_report? report
      end

      def puppet_report?(report)
        first_log = report.logs.first
        first_log && first_log.source.value == 'Puppet'
      end
    end
  end
end

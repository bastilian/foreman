require 'test_helper'

class PuppetReportScannerTest < ActiveSupport::TestCase
  describe '.scan' do
    context 'with a puppet report' do
      let(:importer) do
        ConfigReportImporter.class.stubs(:report_scanner)
                            .returns [Foreman::PuppetReportScanner]
        ConfigReportImporter.new read_json_fixture('reports/empty.json')
      end

      setup do
        importer.send(:create_report_and_logs)
      end

      it 'changes the origin to "Puppet"' do
        assert_nil importer.report.origin
        importer.scan
        assert_equal 'Puppet', importer.report.origin
      end
    end
  end
end

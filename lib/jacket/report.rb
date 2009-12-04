require 'erb'

class Jacket
  class Report
    
    attr_reader :doc
    
    def initialize(jacket)
      path_to_gem = File.expand_path(File.join(File.dirname(__FILE__), '..', '..'))
      @doc = ERB.new(File.read(File.join(path_to_gem, 'lib', 'jacket', 'report.erb'))).result(binding)
    end
  end
end

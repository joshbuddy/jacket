require 'eventmachine'
require 'em-beanstalk'
require 'sqlite3'
require 'json'
require 'tmpdir'
require 'beanstalk-client'
require 'thin'

$: << File.dirname(__FILE__)

require 'jacket/server'
require 'jacket/report'
require 'jacket/data'

class Jacket
  
  attr_reader :conn, :data, :last_time
  
  def report
    Report.new(self)
  end
  
  def server
    Server.new(self)
  end
  
  def initialize(host, port, opts = nil)
    puts "Starting Jacket! (#{host}:#{port})"
    @host = host
    @port = port
    @data = Data.new(host, port, opts)
  end
  
end
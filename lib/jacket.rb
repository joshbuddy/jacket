require 'em-jack'
require 'sqlite3'
require 'json'
require 'tmpdir'

$: << File.dirname(__FILE__)

require 'jacket/server'
require 'jacket/report'

class Jacket
  
  attr_reader :conn, :data, :last_time
  
  def report
    Report.new(self)
  end
  
  def server
    Server.new(self)
  end
  
  def initialize(host, port, opts = nil)
    @host = host
    @port = port
    database_file = Digest::MD5.hexdigest("#{host}:#{port}") + ".db"
    @db = SQLite3::Database.new( File.join(Dir.tmpdir, database_file) )

    @db.execute "drop table if exists stats" if opts && opts[:reset]

    @db.execute "create table if not exists stats(data varchar(2000), created_at DATETIME)"
    @db.execute "create index if not exists created_at_idx on stats(created_at)"

    @data = []
    @db.execute("select * from stats order by created_at DESC limit 500").each do |row|
      @data << [Time.parse(row.last), JSON.parse(row.first)]
    end
    @last_time = nil
    
  end
  
  def tick
    jack = EMJack::Connection.new(:host => @host, :port => @port)
    jack.list(:tubes) { |tubes|
      @tubes_from_beanstalk = tubes
      jack.stats { |s|
        data_time = Time.new
        @db.query "insert into stats (data, created_at) values (?, ?)", s.to_json, data_time
        if row = @db.query("select created_at from stats order by created_at limit 1 offset 500").next
          @db.query "delete from stats where created_at >= ?", row.first
        end
        @last_time = data_time
        @data << [data_time, s]
        while data.size > 500
          @data.shift
        end
        jack.close
      }
    }
  end
  
end
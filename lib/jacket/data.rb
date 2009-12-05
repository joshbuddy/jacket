class Jacket
  class Data
    
    GlobalStatTable = 'beanstalk_stats'
    TubeStatTable = "%s_tube_stat"
    
    Stat = Struct.new(:time, :data)
    
    attr_reader :host, :port, :opts, :tubes
    
    def initialize(host, port, opts = nil)
      @host, @port, @opts = host, port, opts
      @database_file = Digest::MD5.hexdigest("#{host}:#{port}") + ".db"
      @db = SQLite3::Database.new( File.join(Dir.tmpdir, @database_file) )
      @tubes = []
    end
    
    def blocking_tubes
      beanstalk.list_tubes.values.flatten
    end
    
    
    def init
      unless @initted

        beanstalk = Beanstalk::Pool.new(["#{host}:#{port}"])

        if opts && opts[:reset]
          @db.execute "drop table if exists #{global_stat_table}"
          beanstalk.list_tubes.values.flatten.each do |tube|
            @db.execute "drop table if exists #{tube_stat_table(tube)}"
          end
        end

        @db.execute "create table if not exists #{global_stat_table}(data varchar(2000), created_at DATETIME)"
        @db.execute "create index if not exists created_at_idx on #{global_stat_table}(created_at)"
        beanstalk.list_tubes.values.flatten.each do |tube|
          @tubes << tube
          @db.execute "create table if not exists #{tube_stat_table(tube)}(data varchar(2000), created_at DATETIME)"
          @db.execute "create index if not exists created_at_idx on #{tube_stat_table(tube)}(created_at)"
        end

        @last_time = nil
        @initted = true
      end
      yield
    end
    
    def tube_stat_table(tube)
      TubeStatTable % tube.gsub('-', '_')
    end
    
    def global_stat_table
      GlobalStatTable
    end
    
    def create_table_for_tube(tube)
      @db.execute "create table if not exists #{tube_stat_table(tube)}(data varchar(2000), created_at DATETIME)"
      @db.execute "create index if not exists created_at_idx on #{tube_stat_table(tube)}(created_at)"
    end
    
    def beanstalk_stats
      get_data_for_table(global_stat_table)
    end
    
    def tube_stats(tube)
      get_data_for_table(tube_stat_table(tube))
    end

    def get_data_for_table(table)
      data = []
      @db.execute("select * from #{table} order by created_at ASC limit 500").each do |row|
        data << Stat.new(Time.parse(row.last), JSON.parse(row.first))
      end
      data
    end

    def update(interval)
      init do 
        jack = EM::Beanstalk.new(:host => @host, :port => @port)
        jack.list { |tubes|
          @tubes = tubes
          @tubes.each {|tube|
            data_time = Time.new
            jack.stats(:tube, tube) do |tube_stats|
              @db.query "insert into #{tube_stat_table(tube)} (data, created_at) values (?, ?)", tube_stats.to_json, data_time
              if row = @db.query("select created_at from #{tube_stat_table(tube)} order by created_at limit 1 offset 500").next
                @db.query "delete from #{tube_stat_table(tube)} where created_at >= ?", row.first
              end
            end
          }
          jack.stats { |s|
            
            data_time = Time.new
            @db.query "insert into #{global_stat_table} (data, created_at) values (?, ?)", s.to_json, data_time
            if row = @db.query("select created_at from #{global_stat_table} order by created_at limit 1 offset 500").next
              @db.query "delete from #{global_stat_table} where created_at >= ?", row.first
            end
            @last_time = data_time
            EM.add_timer(interval) {update(interval) }
          }
        }
      end
    end
  end
end
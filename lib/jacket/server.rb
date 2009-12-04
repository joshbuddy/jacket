class Jacket
  class Server

    attr_reader :jacket

    def initialize(jacket)
      @jacket = jacket
    end
    
    def call(env)
      puts "called!!"
      builder = Rack::Builder.new do
        use Rack::Lint
        use Rack::Static, :urls => ["/resources"], :root => File.join(File.dirname(__FILE__), '..', '..')
      end
      builder.run proc{|env| [200, {'Content-length' => jacket.report.doc.size.to_s, 'Content-type' => 'text/html'}, [jacket.report.doc]] }
      builder.call(env)
    end
    
    def start
      @server = self
      EM.run do
        
        EM.add_periodic_timer(5) do
          jacket.tick
        end
        Thin::Logging.debug = true
        Thin::Server.start('0.0.0.0', 3000, self)
      end      
      
    end
    
  end
end
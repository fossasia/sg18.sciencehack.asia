def is_number? str
	str.to_i.to_s == str.to_s
end

def check_arg(message1, i)
	if is_number? ARGV[i + 1]
		puts "#{message1} setted to #{ARGV[i+1]}."
	else
		abort("Invalid argument \"#{ARGV[i]} #{ARGV[i+1]}\". Program aborted!")
	end
end

class Input
	def get
		options = {"max_line" => nil, "max" => nil, "min" => nil, "regex_sentence" => nil, "regex" => nil}
		for i in 0..ARGV.length - 1
			case ARGV[i]
			when "max_line"
				check_arg("Maximum number of characters in a single line", i)
				options["max_line"] = ARGV[i+1]
			when "max"
				check_arg("Maximum number of characters in the whole commit message", i)
				options["max"] = ARGV[i+1]
			when "min"
				check_arg("Minimum Number of characters in the whole commit message", i)
				options["min"] = ARGV[i+1]
			when "regex_sentence"
				puts "#{ARGV[i+1]} will be matched to each sentence (seperated by dots (fullstops/periods))."
				options["regex_sentence"] = ARGV[i+1]
			when "regex"
				puts "#{ARGV[i+1]} will be matched against the whole commit message."
				options["regex"] = ARGV[i+1]
			end
		end	
		return options
	end

end

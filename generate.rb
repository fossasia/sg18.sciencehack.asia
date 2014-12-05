def max_line(file, value)
	file.puts("message.split(\"\n\").each {|line| exit 1 if line.length > #{value}}")
	return file
end

def max(file, value)
	file.puts("exit 1 if message.length > #{value}")
	return file
end

def min(file, value)
	file.puts("exit 1 if message.length < #{value}")
	return file
end

def regex_sentence(file, value)
	file.puts("message.split(\".\").each {|sentence| exit 1 if !#{value}.match(sentence) }")
	return file
end

def regex(file, value)
	file.puts("exit 1 if !#{value}.match(message)")
	return file
end

class Generate
	def validator(options)
		file = File.open(".git/hooks/commit-msg", "w")
		file.puts("#!/usr/bin/env ruby\nmessage_file = ARGV[0]\nmessage = File.read(message_file)")
		file = max_line(file, options["max_line"]) if options["max_line"] != nil
		file = max(file, options["max"]) if options["max"] != nil
		file = min(file, options["min"]) if options["min"] != nil
		file = regex_sentence(file, options["regex_sentence"]) if options["regex_sentence"] != nil
		file = regex(file, options["regex"]) if options["regex"] != nil
		file.close
		Dir.chdir(".git/hooks") do
			`chmod 755 commit-msg`
		end
	end	
end

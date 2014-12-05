require_relative "input.rb"
require_relative "generate.rb"

options = Input.new.get
Generate.new.validator(options)

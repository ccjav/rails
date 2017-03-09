class Url < ApplicationRecord
	before_create :shorten_link

	def shorten_link
		o = [('a'..'z'), ('A'..'Z')].map(&:to_a).flatten
		string = (0...6).map { o[rand(o.length)] }.join
		self.short_url = "http://www.sho.rt/#{string}"
	end
end

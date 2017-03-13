class Link < ApplicationRecord
  belongs_to :user
  validates :original_link, presence: true
end

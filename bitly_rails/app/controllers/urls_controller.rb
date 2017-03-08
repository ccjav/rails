class UrlsController < ApplicationController
  def index
    @urls = Url.all
  end

  def show
    @url = Url.find(params[:id])
  end

  def new
    @url = Url.new
  end

  def create
    @url = Url.new(url_params)

    if @url.save
      redirect_to @url
    else
      render 'new'
    end
  end

  private

  def url_params
    params.require(:url).permit(:original_url, short_url: shorten_link)
  end

  def shorten_link
    o = [('a'..'z'), ('A'..'Z')].map(&:to_a).flatten
    string = (0...6).map { o[rand(o.length)] }.join
    "http://www.sho.rt/#{string}"
  end
end

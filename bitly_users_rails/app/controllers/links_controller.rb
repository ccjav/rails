class LinksController < ApplicationController
  def index
    @urls = Link.all
  end

  def show
    @url = Link.find(params[:id])
  end

  def new

  end

  def create
    @url = Link.new(url_params)

    @url.save

    redirect_to '/'
  end

  private
    def url_params
      params.require(:link).permit(:original_link)
    end
end

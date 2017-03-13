class UsersController < ApplicationController
	def show
		@user = User.find(params[:id])
		@links = @user.links
	end

	def new

  	end

	def create
		@user = User.new(url_params)

		@user.save
		redirect_to @user
	end

	private
	    def url_params
	      params.require(:user).permit(:email, :password)
	    end
end

module Api::V1
	class MembersController < ApplicationController
		# before_action :set_member, only: [:show, :update, :destroy]

		#GET /api/v1/members
		def index
			@members = Member.all
			render json: @members
		end

		#POST /api/v1/members
		def create
			@member = Member.create(member_params)
			render json: @member
		end

		#GET /api/v1/members/:id
		def show
			@member = Member.find(params[:id])
			render json: @member
		end

		#GET /api/v1/members/:id/children
		def children
			@members = Member.find(params[:id]).subordinates
			render json: @members
		end
			
		#PATCH/PUT /api/v1/members
		def update
		end

		#DELETE /api/v1/members
		def destroy
		end


		private
		# Use callbacks to share common setup or constraints between actions.
			def set_member
				@member = Member.find(params[:id])
			end
		# Never trust parameters from the scary internet, only allow the white list through.
			def member_params
				params.require(:member).permit(:name, :title, :manager)
			end
		
	end
end
